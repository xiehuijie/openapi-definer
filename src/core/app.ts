import type { Text } from '../utils/i18n.ts';
import type { SecurityDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { ServerDefinition } from './server.ts';
import type { TagDefinition } from './tag.ts';
import { EndpointDefinition } from './endpoint.ts';
import { ZodStructType } from './_zod.ts';

interface AppOptions {
  /**
   * ### API的标题 `i18n`
   */
  title: Text;
  /**
   * ### API的简短描述 `i18n` `md`
   */
  description?: Text;
  /**
   * ### 服务条款的 URL `url`
   */
  termsOfService?: string;
  /**
   * ### 公开 API 的联系信息
   */
  contact?: {
    /** 联系人/组织的标识名称 */
    name?: string;
    /** 指向联系信息的 URL `url` */
    url?: string;
    /** 联系人/组织的电子邮件地址 `email` */
    email?: string;
  };
  /**
   * ### 公开 API 的许可证信息
   */
  license?: {
    /** 用于 API 的许可证名称 */
    name: string;
    /** 用于 API 的许可证的 URL `url` */
    url: string;
  };
  /**
   * ### OpenAPI 文档的版本
   */
  version: string;
  /**
   * ### API 安全方案
   *
   * - 声明可用于整个 API 的安全机制。
   * - 值列表包括可使用的替代安全要求对象。
   * - 只需满足其中一个安全要求对象即可授权请求。
   * - 可在单端点中覆盖此定义。
   */
  security?: SecurityDefinition[];
  /**
   * ### 服务器列表
   *
   * 指定 API 可用的服务器列表。
   */
  servers?: ServerDefinition[];
  /**
   * ### 额外的外部文档
   */
  externalDocs?: ExternalDocsDefinition;
  /**
   * ### 标签列表
   */
  tags?: TagDefinition[];
  /**
   * ### 统一处理所有端点的返回值结构体
   *
   * - 可通过此回调函数对所有端点的返回值结构体进行统一处理。
   * @param id 端点ID
   * @param struct 原始返回值结构体
   * @defaults 默认不做任何处理，即：`(id, struct) => struct`
   * @returns 处理后的返回值结构体
   */

  unifiyResponseStruct?: (id: string, struct: ZodStructType) => ZodStructType;
}

class AppDefinition {
  private options: AppOptions;
  private endpoints: EndpointDefinition[] = [];

  constructor(options: AppOptions) {
    this.options = options;
  }

  public get title() {
    return this.options.title;
  }

  public get description() {
    return this.options.description;
  }

  public get version() {
    return this.options.version;
  }

  public get termsOfService() {
    return this.options.termsOfService;
  }

  public get contact() {
    return this.options.contact;
  }

  public get license() {
    return this.options.license;
  }

  public get security() {
    return this.options.security;
  }

  public get servers() {
    return this.options.servers;
  }

  public get externalDocs() {
    return this.options.externalDocs;
  }

  public get tags() {
    return this.options.tags;
  }

  /**
   * 添加端点
   */
  public addEndpoint(endpoint: EndpointDefinition) {
    this.endpoints.push(endpoint);
    return this;
  }

  /**
   * 批量添加端点
   */
  public addEndpoints(endpoints: EndpointDefinition[]) {
    this.endpoints.push(...endpoints);
    return this;
  }

  /**
   * 获取所有端点
   */
  public getEndpoints() {
    return this.endpoints;
  }
}

export { AppDefinition };
export const defineApp = (options: AppOptions) => new AppDefinition(options);
