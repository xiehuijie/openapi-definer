import type { Text } from '../utils/i18n.ts';
import type { Method } from '../types/openapi.ts';
import type { TagDefinition } from './tag.ts';
import type { SecurityDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { ZodFieldType } from './_zod.ts';
import type { ErrorDefinition } from './error.ts';
import type { HttpStatusCode } from '../types/httpStatus.ts';
import type { MediaTypeDefinition } from './media.ts';
import type { LayerDefinition } from './layer.ts';
import type { OpenAPIV3_1 } from 'openapi-types';
import { setEndpointFn } from './_openapi.ts';

export interface CommonParameters {
  /**
   * ### 查询参数
   */
  query?: Record<string, ZodFieldType>;
  /**
   * ### 头参数
   */
  header?: Record<string, ZodFieldType>;
  /**
   * ### Cookie参数
   */
  cookie?: Record<string, ZodFieldType>;
  /**
   * ### 路径参数
   */
  path?: Record<string, ZodFieldType>;
}

interface RequestBody {
  /**
   * ### 请求体
   */
  body?: MediaTypeDefinition;
}

interface Response {
  /**
   * ### 响应状态码
   *
   * 默认值为 `200`
   */
  status?: HttpStatusCode;
  /**
   * ### 响应描述
   */
  description?: Text;
  /**
   * ### 响应内容
   */
  content?: MediaTypeDefinition;
  /**
   * ### 额外响应头
   */
  headers?: Record<string, ZodFieldType>;
}

interface EndpointOptions<M extends Method = Method> {
  /**
   * ### 接口ID `unique`
   */
  id: string;
  /**
   * ### 请求路径
   * ---
   * - 路径参数请使用`{param}`语法定义，并在`parameters.path`中声明
   * - 路径需以斜杠`/`开头
   * - 该路径为相对于所属层的路径，若无所属层则为绝对路径
   */
  path: string;
  /**
   * ### HTTP方法
   */
  method: M;
  /**
   * ### 接口标题 `i18n`
   */
  title?: Text;
  /**
   * ### 接口描述 `i18n` `md`
   */
  description?: Text;
  /**
   * ### 参数定义
   */
  parameters?: CommonParameters & (M extends 'GET' | 'DELETE' | 'HEAD' ? {} : RequestBody);
  /**
   * ### 响应定义
   */
  responses: Response | Response[];
  /**
   * ### 可能的错误列表
   */
  errors?: ErrorDefinition[];
  /**
   * ### 标签列表
   */
  tags?: TagDefinition[];
  /**
   * ### 外部文档
   */
  externalDocs?: ExternalDocsDefinition;
  /**
   * ### 安全要求
   *
   * 可通过此属性为此端点覆盖应用层面的安全要求数组。若此端点不需要任何安全措施，可以将此属性设置为空数组。
   */
  security?: SecurityDefinition[];
  /**
   * ### 是否已废弃
   */
  deprecated?: boolean;
  /**
   * ### 所属层
   * ---
   * - 若设置此属性，则此端点会继承该层的共同路径、标签和安全配置等。
   */
  layer?: LayerDefinition;
}

export class EndpointDefinition {
  private options: EndpointOptions;
  constructor(options: EndpointOptions) {
    this.options = options;
    setEndpointFn(this, (locale): OpenAPIV3_1.PathItemObject => {
      const pathItem: OpenAPIV3_1.PathItemObject = {
        summary: this.options.title ? this.options.title[locale] : void 0,
        description: this.options.description ? this.options.description[locale] : void 0,
      };
      return pathItem;
    });
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

  get options_() {
    return this.options;
  }
}

export const defineEndpoint = (options: EndpointOptions): EndpointDefinition => new EndpointDefinition(options);
