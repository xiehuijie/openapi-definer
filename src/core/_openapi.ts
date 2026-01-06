import { OpenAPIV3_1 } from 'openapi-types';
import type { AppDefinition } from './app.ts';
import type { SecurityDefinition } from './security.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { EndpointDefinition } from './endpoint.ts';


// 安全方案生成函数
type SecuritySchemaGenerator = (locale: string) => OpenAPIV3_1.SecuritySchemeObject;
const security = new Map<SecurityDefinition, SecuritySchemaGenerator>();
/** 配置安全方案的`OpenAPI Schema`生成函数 */
export const setSecurityFn = (def: SecurityDefinition, fn: SecuritySchemaGenerator) => security.set(def, fn);

// 外部文档生成函数
type ExternalDocumentSchemaGenerator = (locale: string) => OpenAPIV3_1.ExternalDocumentationObject;
const externalDocs = new Map<ExternalDocsDefinition, ExternalDocumentSchemaGenerator>();
/** 配置外部文档的`OpenAPI Schema`生成函数 */
export const setExternalDocsFn = (def: ExternalDocsDefinition, fn: ExternalDocumentSchemaGenerator) => externalDocs.set(def, fn);

// 端点生成函数
type EndpointSchemaGenerator = (locale: string) => OpenAPIV3_1.PathItemObject;
const endpoints = new Map<EndpointDefinition, EndpointSchemaGenerator>();
/** 配置端点的`OpenAPI Schema`生成函数 */
export const setEndpointFn = (def: EndpointDefinition, fn: EndpointSchemaGenerator) => endpoints.set(def, fn);


export const _generate = (_app: AppDefinition): OpenAPIV3_1.Document => {
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
