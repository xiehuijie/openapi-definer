import { writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

interface InitOptions {
  dir: string;
}

export default async function initAction(options: InitOptions) {
  console.log('🚀 Initializing new API definition project...');
  console.log('Directory:', options.dir);

      const targetDir = resolve(options.dir);

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
}
