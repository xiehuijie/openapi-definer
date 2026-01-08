import { writeFileSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { _generate } from '../index.ts';
import type { AppDefinition } from '../core/app.ts';

interface GenerateOptions {
  output: string;
  format: string;
  locale: string;
}

export default async function generateAction(file: string, options: GenerateOptions) {
  try {
    console.log('🚀 Generating OpenAPI specification...');
    console.log('Input file:', file);
    console.log('Output file:', options.output);
    console.log('Format:', options.format);
    console.log('Locale:', options.locale);

        // 验证输入文件是否存在
        const inputPath = resolve(file);
        if (!existsSync(inputPath)) {
          console.error(`❌ Error: Input file not found: ${inputPath}`);
          process.exit(1);
        }

        // 动态导入 API 定义文件
        const module = await import(inputPath);
        
        // 查找 AppDefinition 实例
        let app: AppDefinition | undefined;
        if (module.default && typeof module.default === 'object') {
          app = module.default as AppDefinition;
        } else if (module.app && typeof module.app === 'object') {
          app = module.app as AppDefinition;
        } else {
          // 尝试查找第一个 AppDefinition 实例
          for (const key of Object.keys(module)) {
            if (module[key] && typeof module[key] === 'object') {
              app = module[key] as AppDefinition;
              break;
            }
          }
        }

        if (!app) {
          console.error('❌ Error: No AppDefinition instance found in the input file');
          console.error('   Please export an AppDefinition instance as "app" or as default export');
          process.exit(1);
        }

        // 生成 OpenAPI 文档
        const document = _generate(app, options.locale);

        // 确定输出格式
        let format = options.format.toLowerCase();
        const outputExt = extname(options.output).toLowerCase();
        if (outputExt === '.json') {
          format = 'json';
        } else if (outputExt === '.yaml' || outputExt === '.yml') {
          format = 'yaml';
        }

        // 输出文件
        const outputPath = resolve(options.output);
        let content: string;

        if (format === 'yaml' || format === 'yml') {
          // YAML 格式
          try {
            // 尝试动态导入 js-yaml (可选依赖)
            // 使用 Function 构造函数避免 TypeScript 编译时检查
            const dynamicImport = new Function('specifier', 'return import(specifier)');
            const yaml = await dynamicImport('js-yaml').catch(() => null);
            if (!yaml) {
              console.warn('⚠️  Warning: js-yaml not installed, falling back to JSON format');
              console.warn('   Install js-yaml to enable YAML output: pnpm add js-yaml');
              format = 'json';
              content = JSON.stringify(document, null, 2);
            } else {
              content = yaml.dump(document, { 
                indent: 2,
                lineWidth: 120,
                noRefs: true,
              });
            }
          } catch (error) {
            console.warn('⚠️  Warning: Failed to generate YAML, falling back to JSON format');
            format = 'json';
            content = JSON.stringify(document, null, 2);
          }
        } else {
          // JSON 格式
          content = JSON.stringify(document, null, 2);
        }

        writeFileSync(outputPath, content, 'utf-8');
        console.log(`✅ OpenAPI specification generated successfully: ${outputPath}`);
        console.log(`   Format: ${format.toUpperCase()}`);
        console.log(`   OpenAPI Version: ${document.openapi}`);
        console.log(`   API Title: ${document.info.title}`);
        console.log(`   API Version: ${document.info.version}`);
        console.log(`   Endpoints: ${Object.keys(document.paths || {}).length} paths`);
  } catch (error) {
    console.error('❌ Error generating OpenAPI specification:', error);
    if (error instanceof Error) {
      console.error('   ', error.message);
      if (error.stack) {
        console.error('\n', error.stack);
      }
    }
    process.exit(1);
  }
}
