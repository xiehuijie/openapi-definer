/**
 * Common types for OpenAPI Definder
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface EndpointDefinition {
  method: HttpMethod;
  path: string;
  description?: string;
  tags?: string[];
}

export interface SchemaDefinition {
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
}
