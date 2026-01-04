type SecurityType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
interface BaseOptions {
  /** 安全方案的简短描述 `md` */
  description: string;
}
interface ApiKeyOptions extends BaseOptions {
  /** 要使用的头部、查询或 cookie 参数的名称 */
  name: string;
  /** API 密钥的位置 */
  in: 'query' | 'header' | 'cookie';
}
interface HttpOptions extends BaseOptions {
  /** 要在 RFC7235 定义的 Authorization 头部中使用的 HTTP 授权方案名称。使用的值应在 IANA Authentication Scheme registry 中注册 */
  scheme: string;
}
interface OAuthFlowItem {
  /** 授权 URL，用于隐式和授权码授权类型 `url` */
  authorizationUrl: string;
  /** 令牌 URL，用于密码、客户端凭证和授权码授权类型 `url` */
  tokenUrl: string;
  /** 刷新 URL，用于刷新令牌 `url` */
  refreshUrl?: string;
  /** OAuth2 安全方案的可用范围。一个映射，包含范围名称及其简短描述。该映射可以为空 */
  scopes: Record<string, string>;
}
interface OAuth2Options extends BaseOptions {
  flows: {
    /** OAuth 隐式流程的配置 */
    implicit?: Omit<OAuthFlowItem, 'tokenUrl'>;
    /** OAuth 资源所有者密码流程的配置 */
    password?: Omit<OAuthFlowItem, 'authorizationUrl'>;
    /** OAuth 客户端凭证流程的配置 */
    clientCredentials?: Omit<OAuthFlowItem, 'authorizationUrl'>;
    /** OAuth 授权码流程的配置 */
    authorizationCode?: OAuthFlowItem;
  };
}
interface OpenIdConnectOptions extends BaseOptions {
  /** 用于发现 OAuth2 配置值的 OpenID Connect URL `url` */
  openIdConnectUrl: string;
}

class SecurityDefinition {
  constructor(type: 'apiKey', options: ApiKeyOptions);
  constructor(type: 'http', options: HttpOptions);
  constructor(type: 'oauth2', options: OAuth2Options);
  constructor(type: 'openIdConnect', options: OpenIdConnectOptions);
  constructor(
    readonly type: SecurityType,
    readonly options: ApiKeyOptions | HttpOptions | OAuth2Options | OpenIdConnectOptions,
  ) {}
}

export const defineApiKeySecurity = (options: ApiKeyOptions) => new SecurityDefinition('apiKey', options);
