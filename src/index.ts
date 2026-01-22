/**
 * OpenAPI Definer - Main Entry Point
 *
 * A factory definition program that allows you to define things related to the API
 * using intuitive code and generate a non-intrusive SDK that can be highly reused
 * by both the server and the client.
 */

export const version = '0.1.0';

export {
  defineApp,
  defineApiKeySecurity,
  defineHttpSecurity,
  defineOAuth2Security,
  defineOpenIdConnectSecurity,
  defineField,
  defineStruct,
  defineLayer,
  defineError,
  defineEndpoint,
  defineExternalDocs,
  defineServer,
  defineTag,
  defineJsonContent,
  defineFileContent,
  _generate,
} from './core/index.ts';
export type { ZodFieldType, ZodStructType } from './core/_openapi.ts';
export { createTextDefiner } from './utils/index.ts';
