import type { z } from 'zod';
import type { Text } from '../utils/i18n.ts';
import type { Method } from '../types/method.ts';
import type { TagDefinition } from './tag.ts';
import type { SecurityDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { ServerDefinition } from './server.ts';

/** 参数位置 */
type ParameterIn = 'path' | 'query' | 'header' | 'cookie';

/** 参数定义 */
interface Parameter<T extends z.ZodType = z.ZodType> {
  /** 参数名称 */
  name: string;
  /** 参数位置 */
  in: ParameterIn;
  /** 参数描述 */
  description?: Text;
  /** 是否必需 */
  required?: boolean;
  /** 参数schema */
  schema: T;
  /** 示例值 */
  example?: z.infer<T>;
}

/** 请求体定义 */
interface RequestBody<T extends z.ZodType = z.ZodType> {
  /** 描述 */
  description?: Text;
  /** 内容类型和schema映射 */
  content: {
    [mediaType: string]: {
      schema: T;
      example?: z.infer<T>;
    };
  };
  /** 是否必需 */
  required?: boolean;
}

/** 响应定义 */
interface Response<T extends z.ZodType = z.ZodType> {
  /** 描述 */
  description: Text;
  /** 响应头 */
  headers?: Record<
    string,
    {
      description?: Text;
      schema: z.ZodType;
    }
  >;
  /** 内容类型和schema映射 */
  content?: {
    [mediaType: string]: {
      schema: T;
      example?: z.infer<T>;
    };
  };
}

interface EndpointOptions {
  /**
   * ### 接口ID `unique`
   */
  id: string;
  /**
   * ### 请求路径
   */
  path: string;
  /**
   * ### HTTP方法
   */
  method: Method;
  /**
   * ### 接口摘要
   */
  summary?: Text;
  /**
   * ### 接口描述 `i18n` `md`
   */
  description?: Text;
  /**
   * ### 标签列表
   */
  tags?: TagDefinition[];
  /**
   * ### 外部文档
   */
  externalDocs?: ExternalDocsDefinition;
  /**
   * ### 参数列表
   */
  parameters?: Parameter[];
  /**
   * ### 请求体
   */
  requestBody?: RequestBody;
  /**
   * ### 响应定义
   */
  responses: {
    [statusCode: string]: Response;
  };
  /**
   * ### 安全要求
   */
  security?: SecurityDefinition[];
  /**
   * ### 服务器列表
   */
  servers?: ServerDefinition[];
  /**
   * ### 是否已废弃
   */
  deprecated?: boolean;
}

class Endpoint {
  private options: EndpointOptions;
  constructor(options: EndpointOptions) {
    this.options = options;
  }

  get id() {
    return this.options.id;
  }

  get path() {
    return this.options.path;
  }

  get method() {
    return this.options.method;
  }

  get summary() {
    return this.options.summary;
  }

  get description() {
    return this.options.description;
  }

  get tags() {
    return this.options.tags;
  }

  get parameters() {
    return this.options.parameters;
  }

  get requestBody() {
    return this.options.requestBody;
  }

  get responses() {
    return this.options.responses;
  }

  get security() {
    return this.options.security;
  }

  get servers() {
    return this.options.servers;
  }

  get deprecated() {
    return this.options.deprecated;
  }

  get externalDocs() {
    return this.options.externalDocs;
  }
}

export { Endpoint };
export type { EndpointOptions, Parameter, RequestBody, Response, ParameterIn };
export const defineEndpoint = (options: EndpointOptions): Endpoint => new Endpoint(options);
