import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export default async function validateAction(file: string) {
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

    const app = module.app;
    if (!app.title) {
      throw new Error('App must have a title');
    }
    if (!app.version) {
      throw new Error('App must have a version');
    }

    const endpoints = app.getEndpoints();
    console.log(`📊 Found ${endpoints.length} endpoint(s)`);

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
}
