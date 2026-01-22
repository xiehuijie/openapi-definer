import type { Text } from '../utils/i18n.ts';
import type { ExternalDocsDefinition } from './external.ts';
import { setTagGenerator, getExternalDocsSchema } from './_openapi.ts';

interface TagOptions {
  /** 标签名称 `unique` */
  name: string;
  /** 标签描述 */
  description?: Text;
  /** 此标签的额外外部文档 */
  externalDocs?: ExternalDocsDefinition;
}

export class TagDefinition {
  private options: TagOptions;
  constructor(options: TagOptions) {
    this.options = options;

    setTagGenerator(this, (locale) => ({
      name: this.options.name,
      description: this.options.description?.[locale],
      externalDocs: this.options.externalDocs ? getExternalDocsSchema(this.options.externalDocs, locale) : undefined,
    }));
  }

  get name() {
    return this.options.name;
  }
}

export const defineTag = (options: TagOptions) => new TagDefinition(options);
