import type { Text } from '../utils/i18n.ts';

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
  }

  get url() {
    return this.options.url;
  }
}

export const defineExternalDocs = (options: ExternalDocsOptions) => new ExternalDocsDefinition(options);
