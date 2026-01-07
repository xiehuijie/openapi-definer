import { OpenAPIV3_1 } from 'openapi-types';
import { type Text, createDefaultText } from '../utils/i18n.ts';
import { AppDefinition } from './app.ts';
import type { SecurityDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { EndpointDefinition, ParametersDefinition, RequestDefinition, ResponsesDefinition } from './endpoint.ts';
import type { MediaTypeDefinition } from './media.ts';
import { HttpStatusCode } from '../types/httpStatus.ts';
import { TagDefinition } from './tag.ts';

// 默认响应描述
const responseDescriptionMap = new Map<HttpStatusCode, Text>();
Object.entries(HttpStatusCode).forEach(([text, status]) => responseDescriptionMap.set(status, createDefaultText(text)));
export const setResponseDescription = (descriptions: Partial<Record<HttpStatusCode, Text>>) => {
  for (const status of Object.keys(responseDescriptionMap).map((k) => parseInt(k)) as HttpStatusCode[]) {
    responseDescriptionMap.set(status, descriptions[status]!);
  }
};
export const getResponseDescription = (status: HttpStatusCode, locale: string) => responseDescriptionMap.get(status)![locale];

// 安全方案
type SecuritySchemaGenerator = (locale: string) => OpenAPIV3_1.SecuritySchemeObject;
const security_generator_map = new Map<SecurityDefinition, SecuritySchemaGenerator>();
/** 配置安全方案的`OpenAPI Schema`生成函数 */
export const setSecurityGenerator = (def: SecurityDefinition, fn: SecuritySchemaGenerator) => security_generator_map.set(def, fn);
/** 获取安全方案的`OpenAPI Schema` */
export const getSecuritySchema = (def: SecurityDefinition, locale: string) => security_generator_map.get(def)!(locale);

// 外部文档
type ExternalDocumentSchemaGenerator = (locale: string) => OpenAPIV3_1.ExternalDocumentationObject;
const external_docs_generator_map = new Map<ExternalDocsDefinition, ExternalDocumentSchemaGenerator>();
/** 配置外部文档的`OpenAPI Schema`生成函数 */
export const setExternalDocsGenerator = (def: ExternalDocsDefinition, fn: ExternalDocumentSchemaGenerator) => external_docs_generator_map.set(def, fn);
/** 获取外部文档的`OpenAPI Schema` */
export const getExternalDocsSchema = (def: ExternalDocsDefinition, locale: string) => external_docs_generator_map.get(def)!(locale);
// 参数
type ParameterSchemaGenerator = (locale: string) => OpenAPIV3_1.ParameterObject;
const parameters_generator_map = new Map<ParametersDefinition, ParameterSchemaGenerator>();
/** 配置参数的`OpenAPI Schema`生成函数 */
export const setParameterGenerator = (def: ParametersDefinition, fn: ParameterSchemaGenerator) => parameters_generator_map.set(def, fn);
/** 获取参数的`OpenAPI Schema` */
export const getParameterSchema = (def: ParametersDefinition, locale: string) => parameters_generator_map.get(def)!(locale);

// 请求体
type RequestSchemaGenerator = (locale: string) => OpenAPIV3_1.RequestBodyObject;
const request_generator_map = new Map<RequestDefinition, RequestSchemaGenerator>();
/** 配置请求体的`OpenAPI Schema`生成函数 */
export const setRequestGenerator = (def: RequestDefinition, fn: RequestSchemaGenerator) => request_generator_map.set(def, fn);
/** 获取请求体的`OpenAPI Schema` */
export const getRequestSchema = (def: RequestDefinition, locale: string) => request_generator_map.get(def)!(locale);

// 媒体对象
type MediaSchemaGenerator = (locale: string) => OpenAPIV3_1.MediaTypeObject;
const media_generator_map = new Map<MediaTypeDefinition, MediaSchemaGenerator>();
/** 配置媒体对象的`OpenAPI Schema`生成函数 */
export const setMediaGenerator = (def: MediaTypeDefinition, fn: MediaSchemaGenerator) => media_generator_map.set(def, fn);
/** 获取媒体对象的`OpenAPI Schema` */
export const getMediaSchema = (def: MediaTypeDefinition, locale: string) => media_generator_map.get(def)!(locale);

// 响应体
type ResponsesSchemaGenerator = (locale: string) => OpenAPIV3_1.ResponsesObject;
const responses_generator_map = new Map<ResponsesDefinition, ResponsesSchemaGenerator>();
/** 配置响应体的`OpenAPI Schema`生成函数 */
export const setResponseGenerator = (def: ResponsesDefinition, fn: ResponsesSchemaGenerator) => responses_generator_map.set(def, fn);
/** 获取响应体的`OpenAPI Schema` */
export const getResponseSchema = (def: ResponsesDefinition, locale: string) => responses_generator_map.get(def)!(locale);

// 端点 / 接入点 / 接口
type EndpointSchemaGenerator = (app: AppDefinition, locale: string) => OpenAPIV3_1.OperationObject;
const endpoints_generator_map = new Map<EndpointDefinition, EndpointSchemaGenerator>();
/** 配置端点的`OpenAPI Schema`生成函数 */
export const setEndpointGenerator = (def: EndpointDefinition, fn: EndpointSchemaGenerator) => endpoints_generator_map.set(def, fn);
/** 获取端点的`OpenAPI Schema` */
export const getEndpointSchema = (def: EndpointDefinition, app: AppDefinition, locale: string) => endpoints_generator_map.get(def)!(app, locale);

// 标签
const app_tags_map = new Map<AppDefinition, Set<TagDefinition>>();
export const getTagNames = (app: AppDefinition, def: readonly TagDefinition[]) => def.map((tag) => (app_tags_map.get(app)!.add(tag), tag.name));

export const _generate = (app: AppDefinition): OpenAPIV3_1.Document => {
  app_tags_map.set(app, new Set());
  return {
    openapi: '3.1.0',
    info: {
      title: '11',
      version: '',
    },
    components: {
      // pathItems
    },
  };
};
