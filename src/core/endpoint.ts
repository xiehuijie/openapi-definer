import { createDefaultText, type Text } from '../utils/i18n.ts';
import type { Method, ParameterLocation } from '../types/openapi.ts';
import type { TagDefinition } from './tag.ts';
import type { SecurityRequireDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import {
  getJsonSchemaMeta,
  getJsonSchemaSpec,
  ZodBasicStruct,
  type ZodFieldType,
  hasJsonSchemaMeta
} from './_openapi.ts';
import type { ErrorDefinition } from './error.ts';
import type { HttpStatusCode } from '../types/httpStatus.ts';
import { type MediaTypeDefinition, defineJsonContent } from './media.ts';
import { __INTERNAL_LAYER__, LayerDefinition } from './layer.ts';
import {
  getMediaSchema,
  getResponseDescription,
  getTagNameSpec,
  setEndpointGenerator,
  setParameterGenerator,
  setRequestGenerator,
  setResponseGenerator,
  getParameterSchema,
  getRequestSchema,
  getResponseSchema,
  getExternalDocsSchema,
  getSecurityRequireSpec,
} from './_openapi.ts';
import { OpenAPIV3_1 } from 'openapi-types';
import z from 'zod';

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

interface BodyParameter {
  /**
   * ### 请求体
   * ---
   * - 适用于此端点的请求体。
   * - 在请求方法为 `GET`、`DELETE` 或 `HEAD` 时，不允许设置此属性。
   * - 不设置此属性时，表示此端点不需要请求体。
   */
  body?: RequestOptions;
}

interface RequestOptions {
  /**
   * ### 请求体简要描述
   */
  description?: Text;
  /**
   * ### 请求体的内容
   * ---
   * - 定义请求体的媒体类型及其对应的内容模式
   */
  content: MediaTypeDefinition | MediaTypeDefinition[];
  /**
   * ### 请求体是否必需
   * ---
   * - 指示请求体在请求中是否为必需提供。
   * - 默认值为 `true`
   * - 若设置为 `false`，表示请求体为可选项。
   */
  required?: boolean;
}

interface ResponsesOptions {
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
   * ---
   * - 定义响应的媒体类型及其对应的内容模式
   * - 可传入单个响应内容定义或响应内容定义数组
   * - 若未提供此属性，则表示该响应无内容
   * - 单个响应状态码下，不得有重复的媒体类型
   */
  content?: MediaTypeDefinition | MediaTypeDefinition[];
  /**
   * ### 额外响应头
   */
  headers?: Record<string, ZodFieldType>;
}

interface ParametersOptions {
  /**
   * ### 参数位置
   */
  location: ParameterLocation;
  /**
   * ### 参数名称
   */
  name: string;
  /**
   * ## 参数模式
   */
  schema: ZodFieldType;
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
  parameters?: CommonParameters & (M extends 'GET' | 'DELETE' | 'HEAD' ? {} : BodyParameter);
  /**
   * ### 响应定义
   * ---
   * - 定义此端点的可能的正确响应
   * - 可传入单个响应定义或响应定义数组
   * - 若未提供此属性，则默认为状态码`200`且无内容的响应
   * - 多个响应定义中，状态码不得重复
   * - 正确响应的状态码不得与错误响应的状态码重复
   */
  responses?: ResponsesOptions | ResponsesOptions[];
  /**
   * ### 可能的错误列表
   */
  errors?: ErrorDefinition[];
  /**
   * ### 标签列表
   * - 适用于此层内所有接口的标签。
   * - 将会扩展已在上层中定义的标签，而非覆盖它们。
   */
  tags?: TagDefinition[];
  /**
   * ### 外部文档
   */
  externalDocs?: ExternalDocsDefinition;
  /**
   * ### 安全要求
   * ---
   * 可通过此属性为此端点覆盖应用层面的安全要求数组。若此端点不需要任何安全措施，可以将此属性设置为空数组。
   */
  security?: SecurityRequireDefinition[];
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

export class ParametersDefinition {
  readonly location: ParameterLocation;
  readonly name: string;
  readonly schema: ZodFieldType;

  constructor(options: ParametersOptions) {
    this.location = options.location;
    this.name = options.name;
    this.schema = options.schema;

    setParameterGenerator(this, (locale) => {
      const hasJsonMeta = hasJsonSchemaMeta(this.schema);
      const schema_meta = hasJsonMeta ? getJsonSchemaMeta(this.schema, locale) : null;
      
      return {
        name: this.name,
        in: this.location,
        description: schema_meta?.description,
        required: schema_meta?.default === void 0,
        schema: getJsonSchemaSpec(this.schema),
      };
    });
  }
}

export class RequestDefinition {
  readonly required: boolean;
  readonly description: Text;
  readonly content: MediaTypeDefinition[];

  constructor(options?: RequestOptions) {
    this.description = options?.description || createDefaultText('');
    this.required = options?.required ?? true;
    this.content = options?.content ? (Array.isArray(options.content) ? options.content : [options.content]) : [];

    // 必需的请求体中必须至少有一个 content
    if (this.required === true && this.content.length === 0) {
      throw new Error('required request must have at least one content');
    }
    // content 中的 media type 不得重复
    if (new Set(this.content.map((c) => c.mime)).size !== this.content.length) {
      throw new Error('duplicate media type in request content');
    }

    setRequestGenerator(this, (locale) => ({
      description: this.description[locale],
      content: this.content.reduce((acc, curr) => ({ ...acc, [curr.mime]: getMediaSchema(curr, locale) }), {} as Record<string, OpenAPIV3_1.MediaTypeObject>),
      required: this.required,
    }));
  }
}

export class ResponsesDefinition {
  /** 可能的状态码 */
  readonly status: readonly HttpStatusCode[];
  /** 不同状态码对应的响应头定义 */
  readonly headers: Readonly<Partial<Record<HttpStatusCode, Record<string, ZodFieldType>>>>;
  /** 不同的响应体定义 */
  readonly contents: Readonly<Partial<Record<HttpStatusCode, MediaTypeDefinition[]>>> = {};

  constructor(options: ResponsesOptions[], errors: readonly ErrorDefinition[]) {
    const checkDuplicateStatusInOptions = () => {
      if (new Set(options.map((o) => o.status || 200)).size !== options.length) {
        throw new Error('duplicate status code in responses options');
      }
    };

    const checkDuplicateMediaTypePerStatus = () => {
      const status_mime_combinations = options.flatMap(({ content, status }) =>
        (Array.isArray(content) ? content : content ? [content] : []).map((content) => `${status || 200}@${content.mime}`),
      );
      if (new Set(status_mime_combinations).size !== status_mime_combinations.length) {
        throw new Error('duplicate media type in response content for the same status code');
      }
    };

    const checkDuplicateStatusBetweenOptionsAndErrors = () => {
      const option_statuses = new Set(options.map((o) => o.status || 200));
      for (const error of errors) {
        if (option_statuses.has(error.http)) {
          throw new Error(`duplicate status code ${error.http} in responses options and errors`);
        }
      }
    };

    checkDuplicateStatusInOptions();
    checkDuplicateMediaTypePerStatus();
    checkDuplicateStatusBetweenOptionsAndErrors();

    const status = new Set<HttpStatusCode>();
    for (const option of options) status.add(option.status || 200);
    for (const error of errors) status.add(error.http);
    this.status = Array.from(status).sort((a, b) => a - b);

    const headers: Partial<Record<HttpStatusCode, Record<string, ZodFieldType>>> = {};
    for (const option of options) {
      if (option.headers !== void 0) {
        headers[option.status || 200] = option.headers;
      }
    }
    this.headers = headers;

    const contents: Partial<Record<HttpStatusCode, MediaTypeDefinition[]>> = {};
    for (const option of options) {
      if (option.content !== void 0) {
        contents[option.status || 200] = Array.isArray(option.content) ? option.content : [option.content];
      }
    }
    for (const status of errors.map((e) => e.http)) {
      const schema = z.union(errors.filter((e) => e.http === status).map((e) => e.schema as ZodBasicStruct));
      contents[status] = [defineJsonContent({ schema })];
    }
    this.contents = contents;

    setResponseGenerator(this, (locale) => {
      return this.status.reduce((acc, status) => {
        acc[status] = {
          description: getResponseDescription(status, locale),
          headers: this.headers[status],
          content: this.contents[status]?.reduce(
            (acc, curr) => ({ ...acc, [curr.mime]: getMediaSchema(curr, locale) }),
            {} as Record<string, OpenAPIV3_1.MediaTypeObject>,
          ),
        };
        return acc;
      }, {} as OpenAPIV3_1.ResponsesObject);
    });
  }
}

export class EndpointDefinition {
  readonly id: string;
  readonly path: string;
  readonly method: Method;
  readonly title: Text;
  readonly description: Text;
  readonly parameters: ParametersDefinition[];
  readonly responses: ResponsesDefinition;
  readonly request: RequestDefinition;
  readonly tags: readonly TagDefinition[];
  readonly externalDocs?: ExternalDocsDefinition;
  readonly security?: readonly SecurityRequireDefinition[];
  readonly deprecated: boolean;
  readonly errors: readonly ErrorDefinition[];
  
  /** 是否明确设置了security（用于区分继承和覆盖） */
  private readonly hasExplicitSecurity: boolean;

  /**
   * 检查端点是否明确设置了安全要求
   */
  get isSecurityExplicitlySet(): boolean {
    return this.hasExplicitSecurity;
  }

  constructor(options: EndpointOptions<Method>) {
    // 当请求方法不允许有请求体却提供了请求体时，抛出错误
    if (['GET', 'DELETE', 'HEAD'].includes(options.method) && 'body' in (options.parameters || {})) {
      throw new Error(`Endpoint with method ${options.method} cannot have a request body.`);
    }
    // 当请求方法不为 HEAD 且未提供任何响应定义时，抛出错误
    if (options.method !== 'HEAD' && (options.responses === void 0 || (Array.isArray(options.responses) && options.responses.length === 0))) {
      throw new Error(`Endpoint with method ${options.method} must have at least one response defined.`);
    }

    // 参数整形，制成统一的 ParametersDefinition 列表
    const normalizeParamters = () => {
      const result: ParametersDefinition[] = [];
      for (const location of ['query', 'path', 'header', 'cookie'] as const) {
        if (options.parameters?.[location] !== void 0) {
          for (const name of Object.keys(options.parameters[location])) {
            result.push(new ParametersDefinition({ location, name, schema: options.parameters[location][name] }));
          }
        }
      }
      return result;
    };
    // 响应整形，制成统一的 ResponseDefinition 列表
    const normalizeResponses = () => {
      const { responses } = options;
      return new ResponsesDefinition(responses === void 0 ? [] : Array.isArray(responses) ? responses : [responses], this.errors);
    };

    const layer = options.layer === void 0 ? __INTERNAL_LAYER__ : options.layer;

    this.id = options.id;
    this.path = layer.path + options.path;
    this.method = options.method;
    this.title = options.title || createDefaultText(this.id);
    this.description = options.description || createDefaultText('');
    this.tags = options.tags ? [...(layer.tags || []), ...options.tags] : (layer.tags ?? []);
    this.externalDocs = options.externalDocs || layer.externalDocs;
    
    // 记录是否明确设置了security
    this.hasExplicitSecurity = 'security' in options;
    this.security = options.security ?? layer.security;
    
    this.deprecated = options.deprecated || false;
    this.errors = options.errors || [];
    this.parameters = normalizeParamters();
    this.request = new RequestDefinition(
      ['GET', 'DELETE', 'HEAD'].includes(options.method) ? { required: false, content: [] } : (options.parameters as BodyParameter)?.body,
    );
    this.responses = normalizeResponses();

    setEndpointGenerator(this, (locale) => {
      return {
        operationId: this.id,
        tags: getTagNameSpec(this.tags),
        summary: this.title[locale],
        description: this.description[locale],
        parameters: this.parameters.length > 0 ? this.parameters.map((p) => getParameterSchema(p, locale)) : void 0,
        requestBody: this.request.content.length > 0 ? getRequestSchema(this.request, locale) : void 0,
        responses: getResponseSchema(this.responses, locale),
        externalDocs: this.externalDocs ? getExternalDocsSchema(this.externalDocs, locale) : void 0,
        security: this.hasExplicitSecurity && this.security ? getSecurityRequireSpec(this.security) : this.hasExplicitSecurity ? [] : void 0,
        deprecated: this.deprecated,
      };
    });
  }
}

export const defineEndpoint = <M extends Method>(options: EndpointOptions<M>) => new EndpointDefinition(options);
