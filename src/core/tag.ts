import type { Text } from '../utils/i18n.ts';
import type { ExternalDocsDefinition } from './external.ts';

interface TagOptions {
  /** 标签名称　`unique` */
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
  }

  get name() {
    return this.options.name;
  }
}

export const defineTag = (options: TagOptions) => new TagDefinition(options);
