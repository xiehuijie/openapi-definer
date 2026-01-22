export const Method = {
  /** GET */
  GET: 'GET',
  /** POST */
  POST: 'POST',
  /** PUT */
  PUT: 'PUT',
  /** DELETE */
  DELETE: 'DELETE',
  /** PATCH */
  PATCH: 'PATCH',
  /** HEAD */
  HEAD: 'HEAD',
  /** OPTIONS */
  OPTIONS: 'OPTIONS',
  /** TRACE */
  TRACE: 'TRACE',
} as const;
// eslint-disable-next-line no-redeclare
export type Method = (typeof Method)[keyof typeof Method];

export const SecurityType = {
  /** Api Key */
  ApiKey: 'apiKey',
  /** HTTP Authentication */
  Http: 'http',
  /** OAuth 2.0 */
  OAuth2: 'oauth2',
  /** OpenID Connect */
  OpenIdConnect: 'openIdConnect',
} as const;
// eslint-disable-next-line no-redeclare
export type SecurityType = (typeof SecurityType)[keyof typeof SecurityType];

export const ParameterLocation = {
  /** Query Parameter */
  Query: 'query',
  /** Header Parameter */
  Header: 'header',
  /** Path Parameter */
  Path: 'path',
  /** Cookie Parameter */
  Cookie: 'cookie',
} as const;
// eslint-disable-next-line no-redeclare
export type ParameterLocation = (typeof ParameterLocation)[keyof typeof ParameterLocation];
