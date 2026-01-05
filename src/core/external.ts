import type { Text } from '../utils/i18n.ts';
import type { OpenAPIV3_1 } from 'openapi-types';
import { setExternalDocsFn } from './_openapi.ts';

interface ExternalDocsOptions {
  /** 额外文档的描述 `i18n` */
  description?: Text;
  /** 额外文档的 URL `url` */
  url: string;
}

export class ExternalDocsDefinition {
  private options: ExternalDocsOptions;
  constructor(options: ExternalDocsOptions) {
    this.options = options;
    setExternalDocsFn(this, (locale): OpenAPIV3_1.ExternalDocumentationObject => {
      return {
        url: this.options.url,
        description: this.options.description ? this.options.description[locale] : void 0,
      };
    });
  }
}

export const defineExternalDocs = (options: ExternalDocsOptions) => new ExternalDocsDefinition(options);
