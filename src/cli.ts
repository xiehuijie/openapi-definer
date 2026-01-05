#!/usr/bin/env node

/**
 * OpenAPI Definer CLI
 *
 * Command-line interface for generating server and client SDKs from API definitions.
 */

import { Command } from 'commander';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { version } from './index.ts';

const program = new Command();

program
  .name('openapi-definer')
  .description('A factory definition program that allows you to define things related to the API using intuitive code')
  .version(version, '-v, --version', 'Display version information');

program
  .command('init')
  .description('Initialize a new API definition project')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .action(async (options) => {
    console.log('🚀 Initializing new API definition project...');
    console.log('Directory:', options.dir);
    
    const targetDir = resolve(options.dir);
    
    // 创建示例文件
    const exampleContent = `import { defineApp, defineEndpoint, Method } from 'openapi-definer';
import { z } from 'zod';

// 定义API应用
export const app = defineApp({
  title: 'My API',
  version: '1.0.0',
  description: 'A sample API built with OpenAPI Definer',
  servers: [],
});

// 定义一个端点
const helloEndpoint = defineEndpoint({
  id: 'hello',
  path: '/hello',
  method: Method.GET,
  summary: 'Say hello',
  description: 'Returns a greeting message',
  parameters: [
    {
      name: 'name',
      in: 'query',
      description: 'Name to greet',
      required: false,
      schema: z.string().default('World'),
    },
  ],
  responses: {
    '200': {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
          example: {
            message: 'Hello, World!',
          },
        },
      },
    },
  },
});

// 添加端点到应用
app.addEndpoint(helloEndpoint);
`;
    
    try {
      writeFileSync(join(targetDir, 'api.ts'), exampleContent);
      console.log('✅ Created api.ts');
      console.log('');
      console.log('Next steps:');
      console.log('  1. Edit api.ts to define your API');
      console.log('  2. Run "openapi-definer serve api.ts" to preview documentation');
      console.log('  3. Run "openapi-definer export api.ts" to generate OpenAPI spec');
    } catch (error) {
      console.error('❌ Error initializing project:', error);
      process.exit(1);
    }
  });

program
  .command('export')
  .description('Export OpenAPI specification from API definition')
  .argument('<file>', 'API definition file')
  .option('-o, --output <file>', 'Output file path')
  .option('-f, --format <format>', 'Output format (json, yaml)', 'json')
  .option('-p, --pretty', 'Pretty print JSON output', false)
  .action(async (file, options) => {
    console.log('📝 Exporting OpenAPI specification...');
    
    try {
      // 动态导入API定义
      const filePath = resolve(file);
      if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const fileUrl = pathToFileURL(filePath).href;
      const module = await import(fileUrl);
      
      if (!module.app) {
        throw new Error('No "app" export found in the file');
      }
      
      const { createGenerator } = await import('./core/generator.ts');
      const generator = createGenerator();
      
      let output: string;
      let defaultExt: string;
      
      if (options.format === 'yaml' || options.format === 'yml') {
        output = generator.toYAML(module.app);
        defaultExt = 'yaml';
      } else {
        output = generator.toJSON(module.app, options.pretty);
        defaultExt = 'json';
      }
      
      // 确定输出文件
      const outputFile = options.output || `openapi.${defaultExt}`;
      const outputPath = resolve(outputFile);
      
      writeFileSync(outputPath, output);
      console.log(`✅ OpenAPI specification exported to: ${outputPath}`);
    } catch (error) {
      console.error('❌ Error exporting specification:', error);
      process.exit(1);
    }
  });

program
  .command('serve')
  .description('Start documentation server')
  .argument('<file>', 'API definition file')
  .option('-p, --port <port>', 'Server port', '3000')
  .option('-h, --host <host>', 'Server host', 'localhost')
  .option('--ui <ui>', 'Documentation UI (swagger, scalar, redoc)', 'scalar')
  .option('--no-open', 'Do not open browser automatically')
  .option('--watch', 'Enable hot reload', false)
  .action(async (file, options) => {
    console.log('🚀 Starting documentation server...');
    
    try {
      const filePath = resolve(file);
      if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const fileUrl = pathToFileURL(filePath).href;
      
      // 定义应用加载器
      const appLoader = async () => {
        // 清除缓存以支持热更新
        delete require.cache[filePath];
        const module = await import(fileUrl + '?t=' + Date.now());
        if (!module.app) {
          throw new Error('No "app" export found in the file');
        }
        return module.app;
      };
      
      if (options.watch) {
        const { createDevServer } = await import('./core/devServer.ts');
        const server = createDevServer(appLoader, {
          port: parseInt(options.port),
          host: options.host,
          ui: options.ui,
          open: options.open,
          watchPath: filePath,
        });
        
        await server.start();
      } else {
        const { createDocServer } = await import('./core/docServer.ts');
        const app = await appLoader();
        const server = createDocServer(app, {
          port: parseInt(options.port),
          host: options.host,
          ui: options.ui,
          open: options.open,
        });
        
        await server.start();
      }
      
      // 保持进程运行
      process.on('SIGINT', () => {
        console.log('\\n👋 Shutting down...');
        process.exit(0);
      });
    } catch (error) {
      console.error('❌ Error starting server:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate an API definition')
  .argument('<file>', 'API definition file to validate')
  .action(async (file) => {
    console.log('🔍 Validating API definition...');
    console.log('File:', file);
    
    try {
      const filePath = resolve(file);
      if (!existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const fileUrl = pathToFileURL(filePath).href;
      const module = await import(fileUrl);
      
      if (!module.app) {
        throw new Error('No "app" export found in the file');
      }
      
      // 基本验证
      const app = module.app;
      if (!app.title) {
        throw new Error('App must have a title');
      }
      if (!app.version) {
        throw new Error('App must have a version');
      }
      
      const endpoints = app.getEndpoints();
      console.log(`📊 Found ${endpoints.length} endpoint(s)`);
      
      // 验证端点
      for (const endpoint of endpoints) {
        if (!(endpoint as any).id) {
          throw new Error('Endpoint must have an id');
        }
        if (!(endpoint as any).path) {
          throw new Error(`Endpoint "${(endpoint as any).id}" must have a path`);
        }
        if (!(endpoint as any).method) {
          throw new Error(`Endpoint "${(endpoint as any).id}" must have a method`);
        }
      }
      
      console.log('✅ API definition is valid');
    } catch (error) {
      console.error('❌ Validation error:', error);
      process.exit(1);
    }
  });

program.parse();
