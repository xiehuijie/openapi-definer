import { OpenAPIV3_1 } from 'openapi-types';
import type { AppDefinition } from './app.ts';

export const _generate = (_app: AppDefinition): OpenAPIV3_1.Document => {
  return {
    openapi: '3.1.0',
    info: {
      title: '11',
      version: '',
    },
    components: {
      // pathItems
    },
  };
};
