import type { Text } from '../utils/i18n.ts';

interface ServerVariableOptions {
  /** 变量描述信息 `i18n` */
  description?: Text;
  /** 默认值 */
  default: string;
  /** 可选值列表 */
  enum?: string[];
}
interface ServerOptions {
  /** 服务器的 URL `url` */
  url: string;
  /** 服务器的描述信息 `i18n` */
  description?: Text;
  /** 服务器变量列表 */
  variables?: Record<string, ServerVariableOptions>;
}

export class ServerDefinition {
  private options: ServerOptions;
  constructor(options: ServerOptions) {
    this.options = options;
  }

  get url() {
    return this.options.url;
  }

  get description() {
    return this.options.description;
  }
}

export const defineServer = (options: ServerOptions) => new ServerDefinition(options);
