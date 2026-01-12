import { OpenAPIV3_1 } from 'openapi-types';
import { type Text, createDefaultText } from '../utils/i18n.ts';
import { AppDefinition } from './app.ts';
import { SecurityDefinition, SecurityRequireDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { EndpointDefinition, ParametersDefinition, RequestDefinition, ResponsesDefinition } from './endpoint.ts';
import type { MediaTypeDefinition } from './media.ts';
import type { ErrorDefinition } from './error.ts';
import { HttpStatusCode } from '../types/httpStatus.ts';
import { TagDefinition } from './tag.ts';
import { z } from 'zod';

// ----------------------------------------------------------- Zod 类型定义 -----------------------------------------------------------
export type ZodBasicField = z.ZodString | z.ZodStringFormat | z.ZodNumber | z.ZodNumberFormat | z.ZodBoolean | z.ZodEnum | z.ZodNull;
export type ZodBasicStruct = z.ZodObject<any> | z.ZodArray<ZodFieldType | z.ZodObject<any> | z.ZodArray<any>>;
export type ZodFieldType = ZodBasicField | z.ZodUnion<ZodBasicField[]> | z.ZodLiteral;
export type ZodStructType = ZodBasicStruct | z.ZodUnion<ZodBasicStruct[]>;

// --------------------------------------------------------- JSON Schema 元数据 ---------------------------------------------------------
interface JsonSchemaMeta {
  id: string;
  title?: string;
  description?: string;
  default?: any;
  examples?: any[];
  deprecated?: boolean;
}
type JsonSchemaMetaGenerator = (locale: string) => Omit<JsonSchemaMeta, 'id'>;

// 全局 Schema ID 映射
const schema2id = new Map<ZodFieldType | ZodStructType, string>();
const id2schema = new Map<string, ZodFieldType | ZodStructType>();
const json_schema_meta = new Map<ZodFieldType | ZodStructType, JsonSchemaMetaGenerator>();

/** 设置 JSON Schema 元数据 */
export const setJsonSchemaMeta = (id: string, schema: ZodFieldType | ZodStructType, fn: JsonSchemaMetaGenerator) => {
  if (id2schema.has(id)) throw new Error(`Schema with ID "${id}" is already registered.`);
  schema2id.set(schema, id);
  id2schema.set(id, schema);
  json_schema_meta.set(schema, fn);
};

/** 获取 Schema ID */
export const getSchemaId = (schema: ZodFieldType | ZodStructType): string | undefined => schema2id.get(schema);

/** 获取 JSON Schema 元数据 */
export const getJsonSchemaMeta = (schema: ZodFieldType | ZodStructType, locale: string): JsonSchemaMeta => {
  if (!json_schema_meta.has(schema)) throw new Error('JsonSchemaMeta not found');
  return { id: schema2id.get(schema)!, ...json_schema_meta.get(schema)!(locale) };
};

/** 检查schema是否有JSON Schema元数据 */
export const hasJsonSchemaMeta = (schema: ZodFieldType | ZodStructType): boolean => json_schema_meta.has(schema);

/** 将 Zod Schema 转换为 JSON Schema */
export const zodToJsonSchema = (schema: ZodFieldType | ZodStructType, locale: string): any => {
  const jsonSchema = schema.toJSONSchema({ target: 'openapi' });
  delete jsonSchema.$schema;
  if (json_schema_meta.has(schema)) {
    const meta = getJsonSchemaMeta(schema, locale);
    if (meta.title) jsonSchema.title = meta.title;
    if (meta.description) jsonSchema.description = meta.description;
    if (meta.default !== undefined) jsonSchema.default = meta.default;
    if (meta.examples) jsonSchema.examples = meta.examples;
    if (meta.deprecated) jsonSchema.deprecated = meta.deprecated;
  }
  return jsonSchema;
};

// ------------------------------------------------------------ 安全方案 ------------------------------------------------------------
type SecuritySchemaGenerator = (locale: string) => OpenAPIV3_1.SecuritySchemeObject;
const security_generator_map = new Map<SecurityDefinition, SecuritySchemaGenerator>();
/** 配置安全方案的`OpenAPI Schema`生成函数 */
export const setSecurityGenerator = (def: SecurityDefinition, fn: SecuritySchemaGenerator) => security_generator_map.set(def, fn);
/** 获取安全方案的`OpenAPI Schema` */
export const getSecuritySchema = (def: SecurityDefinition, locale: string) => security_generator_map.get(def)!(locale);

// ------------------------------------------------------------ 标签对象 ------------------------------------------------------------
type TagSchemaGenerator = (locale: string) => OpenAPIV3_1.TagObject;
const tag_generator_map = new Map<TagDefinition, TagSchemaGenerator>();
/** 配置标签的`OpenAPI Schema`生成函数 */
export const setTagGenerator = (def: TagDefinition, fn: TagSchemaGenerator) => tag_generator_map.set(def, fn);
/** 获取标签的`OpenAPI Schema` */
export const getTagSchema = (def: TagDefinition, locale: string) => tag_generator_map.get(def)!(locale);

// ------------------------------------------------------------ 外部文档 ------------------------------------------------------------
type ExternalDocumentSchemaGenerator = (locale: string) => OpenAPIV3_1.ExternalDocumentationObject;
const external_docs_generator_map = new Map<ExternalDocsDefinition, ExternalDocumentSchemaGenerator>();
/** 配置外部文档的`OpenAPI Schema`生成函数 */
export const setExternalDocsGenerator = (def: ExternalDocsDefinition, fn: ExternalDocumentSchemaGenerator) => external_docs_generator_map.set(def, fn);
/** 获取外部文档的`OpenAPI Schema` */
export const getExternalDocsSchema = (def: ExternalDocsDefinition, locale: string) => external_docs_generator_map.get(def)!(locale);

// ------------------------------------------------------------ 请求参数 ------------------------------------------------------------
type ParameterSchemaGenerator = (locale: string) => OpenAPIV3_1.ParameterObject;
const parameters_generator_map = new Map<ParametersDefinition, ParameterSchemaGenerator>();
/** 配置参数的`OpenAPI Schema`生成函数 */
export const setParameterGenerator = (def: ParametersDefinition, fn: ParameterSchemaGenerator) => parameters_generator_map.set(def, fn);
/** 获取参数的`OpenAPI Schema` */
export const getParameterSchema = (def: ParametersDefinition, locale: string) => parameters_generator_map.get(def)!(locale);

// ------------------------------------------------------------  请求体  ------------------------------------------------------------
type RequestSchemaGenerator = (locale: string) => OpenAPIV3_1.RequestBodyObject;
const request_generator_map = new Map<RequestDefinition, RequestSchemaGenerator>();
/** 配置请求体的`OpenAPI Schema`生成函数 */
export const setRequestGenerator = (def: RequestDefinition, fn: RequestSchemaGenerator) => request_generator_map.set(def, fn);
/** 获取请求体的`OpenAPI Schema` */
export const getRequestSchema = (def: RequestDefinition, locale: string) => request_generator_map.get(def)!(locale);

// ------------------------------------------------------------ 媒体对象 ------------------------------------------------------------
type MediaSchemaGenerator = (locale: string) => OpenAPIV3_1.MediaTypeObject;
const media_generator_map = new Map<MediaTypeDefinition, MediaSchemaGenerator>();
/** 配置媒体对象的`OpenAPI Schema`生成函数 */
export const setMediaGenerator = (def: MediaTypeDefinition, fn: MediaSchemaGenerator) => media_generator_map.set(def, fn);
/** 获取媒体对象的`OpenAPI Schema` */
export const getMediaSchema = (def: MediaTypeDefinition, locale: string) => media_generator_map.get(def)!(locale);

// ------------------------------------------------------------  响应体  ------------------------------------------------------------
type ResponsesSchemaGenerator = (locale: string) => OpenAPIV3_1.ResponsesObject;
const responses_generator_map = new Map<ResponsesDefinition, ResponsesSchemaGenerator>();
/** 配置响应体的`OpenAPI Schema`生成函数 */
export const setResponseGenerator = (def: ResponsesDefinition, fn: ResponsesSchemaGenerator) => responses_generator_map.set(def, fn);
/** 获取响应体的`OpenAPI Schema` */
export const getResponseSchema = (def: ResponsesDefinition, locale: string) => {
  // 获取原始响应Schema
  const originalResponse = responses_generator_map.get(def)!(locale);
  
  // 查找对应的端点以确定是否需要自动添加错误
  if (currentApp) {
    const endpoint = findEndpointByResponsesDefinition(def, currentApp);
    if (endpoint) {
      // 获取端点的所有错误（显式 + 自动）
      const allErrors = getAllErrorsForEndpoint(endpoint, currentApp);
      
      // 如果有自动错误需要添加，合并到响应中
      if (allErrors.length > 0) {
        const errorsByStatus = new Map<number, typeof allErrors>();
        
        // 按状态码分组自动错误
        for (const error of allErrors) {
          if (!errorsByStatus.has(error.http)) {
            errorsByStatus.set(error.http, []);
          }
          // 检查是否已经包含在原始响应中
          if (!(error.http in originalResponse)) {
            errorsByStatus.get(error.http)!.push(error);
          }
        }
        
        // 为每个状态码生成错误响应
        for (const [status, errors] of errorsByStatus) {
          if (errors.length > 0 && !(status in originalResponse)) {
            // 创建错误Schema，如果多个错误则用union
            const errorSchema = errors.length === 1 
              ? errors[0].schema 
              : z.union(errors.map(e => e.schema as any) as [any, any, ...any[]]);
            
            // 应用统一错误响应结构（如果配置了）
            const finalErrorSchema = currentApp.unifyErrorResponseStruct 
              ? currentApp.unifyErrorResponseStruct(endpoint, errorSchema as any)
              : errorSchema;
            
            // 添加到响应中
            originalResponse[status] = {
              description: getResponseDescription(status as any, locale),
              content: {
                'application/json': {
                  schema: getJsonSchemaSpec(finalErrorSchema)
                }
              }
            };
          }
        }
      }
    }
  }
  
  return originalResponse;
};

// ------------------------------------------------------- 端点 / 接入点 / 接口 ------------------------------------------------------
type EndpointSchemaGenerator = (locale: string) => OpenAPIV3_1.OperationObject;
const endpoints_generator_map = new Map<EndpointDefinition, EndpointSchemaGenerator>();
/** 配置端点的`OpenAPI Schema`生成函数 */
export const setEndpointGenerator = (def: EndpointDefinition, fn: EndpointSchemaGenerator) => endpoints_generator_map.set(def, fn);
/** 获取端点的`OpenAPI Schema` */
export const getEndpointSchema = (def: EndpointDefinition, locale: string) => endpoints_generator_map.get(def)!(locale);

// ---------------------------------------------------------- APP 依赖收集 ----------------------------------------------------------
let currentApp: AppDefinition | null = null;
/** 以当前正在生成的 App 为键，从对应映射中获取对应的值 */
const _get = <T>(map: Map<AppDefinition, T>) => {
  if (currentApp === null) throw new Error('No current generating App.');
  return map.get(currentApp)!;
};
/** APP 与 标签的映射 */
const app_tags_map = new Map<AppDefinition, Set<TagDefinition>>();
/** 获取标签名称的描述，同时将标签注册到 App */
export const getTagNameSpec = (defs: readonly TagDefinition[]) => defs.map((tag) => (_get(app_tags_map).add(tag), tag.name));
/** APP 与 安全方案的映射 */
const app_security_map = new Map<AppDefinition, Set<SecurityDefinition>>();
/** 获取安全需求的描述，同时将安全方案注册到 App */
export const getSecurityRequireSpec = (defs: readonly SecurityRequireDefinition[]) =>
  defs.map((req) => (_get(app_security_map).add(req.security), { [req.security.id]: req.requirements as string[] }));
/** APP 与 响应描述的映射 */
const app_response_desc_map = new Map<AppDefinition, Map<HttpStatusCode, Text>>();
/** 获取响应描述，同时将响应描述注册到 App */
export const getResponseDescription = (status: HttpStatusCode, locale: string) => _get(app_response_desc_map).get(status)![locale];
/** APP 与 schema 的映射 */
const app_schema_map = new Map<AppDefinition, Set<ZodFieldType | ZodStructType>>();
/** 获取 zod schema 的引用或内联Json Schema，同时将 zod schema 注册到当前 App */
export const getJsonSchemaSpec = (schema: ZodFieldType | ZodStructType): { $ref: string } | any => {
  const id = schema2id.get(schema);
  if (currentApp && id !== void 0) {
    _get(app_schema_map).add(schema);
    return { $ref: `#/components/schemas/${id}` };
  } else {
    // 当没有注册ID时，生成内联schema但不包含元数据（会在引用时处理）
    return schema.toJSONSchema({ target: 'openapi' });
  }
};

// -------------------------------------------------------- 错误响应处理逻辑 --------------------------------------------------------

/** 从ResponsesDefinition中找到对应的端点 */
const findEndpointByResponsesDefinition = (def: ResponsesDefinition, app: AppDefinition): EndpointDefinition | null => {
  // 通过遍历app中的端点来找到拥有该ResponsesDefinition的端点
  for (const endpoint of app.endpoints) {
    if (endpoint.responses === def) {
      return endpoint;
    }
  }
  return null;
};

/** 检查端点是否有请求参数 */
const hasRequestParameters = (endpoint: EndpointDefinition): boolean => {
  return endpoint.parameters.length > 0 || endpoint.request.content.length > 0;
};

/** 检查端点是否有安全要求 */
const hasSecurityRequirements = (endpoint: EndpointDefinition, app: AppDefinition): boolean => {
  // 如果端点明确设置了security（包括空数组），使用端点的设置
  if (endpoint.isSecurityExplicitlySet) {
    return endpoint.security !== undefined && endpoint.security.length > 0;
  }
  // 否则使用全局安全要求
  return app.security.length > 0;
};

/** 获取安全方案相关的错误 */
const getSecurityErrors = (endpoint: EndpointDefinition, app: AppDefinition): ErrorDefinition[] => {
  const errors: ErrorDefinition[] = [];
  
  // 获取有效的安全要求
  const securityRequirements = endpoint.isSecurityExplicitlySet 
    ? (endpoint.security || [])
    : app.security;
  
  // 收集所有安全方案的错误
  for (const securityReq of securityRequirements) {
    errors.push(...securityReq.security.errors);
  }
  
  return errors;
};

/** 获取端点的所有错误（显式 + 自动） */
const getAllErrorsForEndpoint = (endpoint: EndpointDefinition, app: AppDefinition): ErrorDefinition[] => {
  const errorMap = new Map<string, ErrorDefinition>();
  
  // 先添加端点显式定义的错误
  for (const error of endpoint.errors) {
    errorMap.set(error.id, error);
  }
  
  // 添加参数校验错误（如果有请求参数）
  if (hasRequestParameters(endpoint) && app.globalErrorDefinition?.validationError) {
    const error = app.globalErrorDefinition.validationError;
    if (!errorMap.has(error.id)) {
      errorMap.set(error.id, error);
    }
  }
  
  // 添加安全相关错误（如果有安全要求）
  if (hasSecurityRequirements(endpoint, app)) {
    const securityErrors = getSecurityErrors(endpoint, app);
    for (const error of securityErrors) {
      if (!errorMap.has(error.id)) {
        errorMap.set(error.id, error);
      }
    }
  }
  
  return Array.from(errorMap.values());
};

// 生成 OpenAPI Document
const generateOpenAPIDocument = (locale: string): OpenAPIV3_1.Document => {
  const app = currentApp!;
  // 初始化 App 相关的注册表
  app_tags_map.set(app, new Set());
  app_security_map.set(app, new Set());
  app_schema_map.set(app, new Set());
  app_response_desc_map.set(app, makeDefaultResponseDescMap());

  // 生成各部分OpenApi描述的工具函数
  const getInfoSpec = (): OpenAPIV3_1.InfoObject => ({
    title: app.title[locale],
    version: app.version,
    description: app.description[locale] || undefined,
    termsOfService: app.termsOfService,
    contact: app.contact,
    license: app.license,
  });

  const getServersSpec = (): OpenAPIV3_1.ServerObject[] | undefined => {
    return app.servers.length > 0 ? app.servers.map((server) => ({ url: server.url, description: server.description?.[locale] })) : undefined;
  };

  const getPathsSpec = (): OpenAPIV3_1.PathsObject => {
    const paths: OpenAPIV3_1.PathsObject = {};
    for (const endpoint of app.endpoints) {
      if (!paths[endpoint.path]) {
        paths[endpoint.path] = {};
      }
      (paths[endpoint.path] as any)[endpoint.method.toLowerCase()] = getEndpointSchema(endpoint, locale);
    }
    return paths;
  };

  const getSchemasSpec = (): Record<string, OpenAPIV3_1.SchemaObject> | undefined => {
    const registeredSchemas = app_schema_map.get(app)!;
    if (registeredSchemas.size === 0) return undefined;

    const schemas: Record<string, any> = {};
    for (const schema of registeredSchemas) {
      const id = getSchemaId(schema);
      if (id) {
        const jsonSchema = zodToJsonSchema(schema, locale);
        schemas[id] = jsonSchema;
      }
    }
    return Object.keys(schemas).length > 0 ? schemas : undefined;
  };

  const getSecuritySchemesSpec = (): Record<string, OpenAPIV3_1.SecuritySchemeObject> | undefined => {
    const securitySet = app_security_map.get(app)!;
    if (securitySet.size === 0) return undefined;
    const securitySchemes: Record<string, OpenAPIV3_1.SecuritySchemeObject> = {};
    for (const security of securitySet) {
      securitySchemes[security.id] = getSecuritySchema(security, locale);
    }
    return securitySchemes;
  };

  const getComponentsSpec = (): OpenAPIV3_1.ComponentsObject | undefined => {
    const schemas = getSchemasSpec();
    const securitySchemes = getSecuritySchemesSpec();
    if (!schemas && !securitySchemes) return undefined;
    return { schemas, securitySchemes };
  };

  const getSecuritySpec = (): OpenAPIV3_1.SecurityRequirementObject[] | undefined => {
    return app.security.length > 0 ? getSecurityRequireSpec(app.security) : undefined;
  };

  const getTagsSpec = (): OpenAPIV3_1.TagObject[] | undefined => {
    const tags = app_tags_map.get(app)!;
    return tags.size > 0 ? Array.from(tags).map((tag) => getTagSchema(tag, locale)) : undefined;
  };

  const getExternalDocsSpec = (): OpenAPIV3_1.ExternalDocumentationObject | undefined => {
    return app.externalDocs ? getExternalDocsSchema(app.externalDocs, locale) : undefined;
  };

  // 先生成 paths（这会触发依赖收集）
  const paths = getPathsSpec();
  // 再处理全局安全方案
  const security = getSecuritySpec();

  return {
    openapi: '3.1.0',
    info: getInfoSpec(),
    servers: getServersSpec(),
    paths,
    components: getComponentsSpec(),
    security,
    tags: getTagsSpec(),
    externalDocs: getExternalDocsSpec(),
  };
};

const makeDefaultResponseDescMap = () => {
  const map = new Map<HttpStatusCode, Text>();
  // 遍历状态码枚举，设置默认响应描述
  Object.entries(HttpStatusCode).forEach(([text, status]) => map.set(status, createDefaultText(text)));
  return map;
};

/** 为应用生成 OpenAPI 文档 */
export const _generate = (app: AppDefinition, locale: string = 'en'): OpenAPIV3_1.Document => {
  try {
    // 设置当前正在生成的 App，以便在生成过程中自动注册 schema
    currentApp = app;
    return generateOpenAPIDocument(locale);
  } finally {
    currentApp = null;
  }
};

/** 记录错误信息 */
export const error = (_message: string) => {};
/** 记录警告信息 */
export const warn = (_message: string) => {};
