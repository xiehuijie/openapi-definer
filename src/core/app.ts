import { createDefaultText, type Text } from '../utils/i18n.ts';
import type { SecurityRequireDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { ServerDefinition } from './server.ts';
import type { EndpointDefinition } from './endpoint.ts';
import type { ZodStructType } from './_openapi.ts';
import { ErrorDefinition } from './error.ts';

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
   * ### 所有的端点定义
   */
  endpoints: EndpointDefinition[];
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
   * ### 全局安全方案需求
   *
   * - 声明可用于整个 API 的安全机制。
   * - 值列表包括可使用的替代安全要求对象。
   * - 只需满足其中一个安全要求对象即可授权请求。
   * - 可在单端点或层中覆盖此处定义。
   */
  security?: SecurityRequireDefinition[];
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
   * ### 统一处理所有端点的正确响应返回值结构体
   *---
   * - 可通过此回调函数对所有端点的返回值结构体进行统一处理。
   * @param endpoint 端点定义
   * @param struct 原始返回值结构体
   * @defaults 默认不做任何处理，即：`(endpoint, struct) => struct`
   * @returns 处理后的返回值结构体
   */

  unifySuccessResponseStruct?: (endpoint: EndpointDefinition, struct: ZodStructType) => ZodStructType;
  /**
   * ### 统一处理所有端点的错误响应返回值结构体
   * ---
   * - 可通过此回调函数对所有端点的错误返回值结构体进行统一处理。
   * @param endpoint 端点定义
   * @param struct 原始错误返回值结构体
   * @defaults 默认不做任何处理，即：`(error, struct) => struct`
   * @returns 处理后的错误返回值结构体
   */
  unifyErrorResponseStruct?: (error: EndpointDefinition, struct: ZodStructType) => ZodStructType;
  /**
   * ### 全局错误定义
   */
  globalErrorDefinition?: {
    /** 参数校验错误 */
    validationError?: ErrorDefinition;
  };
}

export class AppDefinition {
  readonly title: Text;
  readonly version: string;
  readonly description: Text;
  readonly endpoints: EndpointDefinition[];
  readonly servers: ServerDefinition[];
  readonly security: readonly SecurityRequireDefinition[];
  readonly termsOfService?: Readonly<AppOptions['termsOfService']>;
  readonly contact?: Readonly<AppOptions['contact']>;
  readonly license?: Readonly<AppOptions['license']>;
  readonly externalDocs?: ExternalDocsDefinition;
  readonly unifySuccessResponseStruct?: AppOptions['unifySuccessResponseStruct'];
  readonly unifyErrorResponseStruct?: AppOptions['unifyErrorResponseStruct'];
  readonly globalErrorDefinition?: AppOptions['globalErrorDefinition'];

  constructor(options: AppOptions) {
    this.title = options.title;
    this.version = options.version;
    this.description = options.description ?? createDefaultText('');
    this.endpoints = options.endpoints;
    this.servers = options.servers ?? [];
    this.security = options.security ?? [];
    this.termsOfService = options.termsOfService;
    this.contact = options.contact;
    this.license = options.license;
    this.externalDocs = options.externalDocs;
    this.unifySuccessResponseStruct = options.unifySuccessResponseStruct;
    this.unifyErrorResponseStruct = options.unifyErrorResponseStruct;
    this.globalErrorDefinition = options.globalErrorDefinition;
  }

  private generate(locale: string, getEndpointSchema: (def: EndpointDefinition, app: AppDefinition, locale: string) => any) {
    const paths: Record<string, Record<string, any>> = {};

    // 遍历所有端点，按路径和方法组织
    for (const endpoint of this.endpoints) {
      if (!paths[endpoint.path]) {
        paths[endpoint.path] = {};
      }
      paths[endpoint.path][endpoint.method.toLowerCase()] = getEndpointSchema(endpoint, this, locale);
    }

    return paths;
  }

  /** 获取路径对象生成器 */
  getPathsGenerator() {
    return this.generate.bind(this);
  }
}

export const defineApp = (options: AppOptions) => new AppDefinition(options);
