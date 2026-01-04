import type { Text } from '../i18n.ts';

interface AppOptions {
  /** API的标题 `i18n` */
  title: Text;
  /** API的简短描述 `i18n` `md` */
  description?: Text;
  /** 服务条款的 URL `url` */
  termsOfService?: string;
  /** 公开 API 的联系信息 */
  contact?: {
    /** 联系人/组织的标识名称 */
    name?: string;
    /** 指向联系信息的 URL `url` */
    url?: string;
    /** 联系人/组织的电子邮件地址 `email` */
    email?: string;
  };
  /** 公开 API 的许可证信息 */
  license?: {
    /** 用于 API 的许可证名称 */
    name: string;
    /** 用于 API 的许可证的 URL `url` */
    url: string;
  };
  /** OpenAPI 文档的版本 */
  version: string;
}

class AppDefinition {
  private options: AppOptions;
  constructor(options: AppOptions) {
    this.options = options;
  }

  public get title() {
    return this.options.title;
  }
}

export const defineApp = (options: AppOptions) => new AppDefinition(options);
