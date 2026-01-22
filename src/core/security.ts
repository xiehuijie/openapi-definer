import { OpenAPIV3_1 } from 'openapi-types';
import type { SecurityType, ParameterLocation } from '../types/openapi.ts';
import type { Text } from '../utils/i18n.ts';
import { setSecurityGenerator } from './_openapi.ts';
import { ErrorDefinition } from './error.ts';

interface BaseOptions {
  /**
   * ### 安全方案ID `unique`
   */
  id: string;
  /**
   * ### 安全方案的简短描述 `md`
   */
  description: Text;
  /**
   * ### 该安全方案可能返回的错误列表
   */
  errors?: ErrorDefinition[];
}
interface ApiKeyOptions extends BaseOptions {
  /**
   * 要使用的头部、查询或 cookie 参数的名称
   */
  name: string;
  /**
   * API 密钥的位置
   */
  in: Exclude<ParameterLocation, 'path'>;
}
interface HttpOptions extends BaseOptions {
  /**
   * 要在 RFC7235 定义的 Authorization 头部中使用的 HTTP 授权方案名称。
   * 使用的值应在 IANA Authentication Scheme registry 中注册
   */
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

export type SecurityOptions = ApiKeyOptions | HttpOptions | OAuth2Options | OpenIdConnectOptions;

/**
 * ### 安全需求定义
 */
export class SecurityRequireDefinition {
  constructor(
    /** 安全方案 */
    readonly security: SecurityDefinition,
    /** 安全需求 */
    readonly requirements: readonly string[],
  ) {}
}

/**
 * ### 安全方案定义
 */
export class SecurityDefinition {
  /** 安全方案ID */
  readonly id: string;
  /** 该安全方案可能返回的错误列表 */
  readonly errors: readonly ErrorDefinition[];

  constructor(type: 'apiKey', options: ApiKeyOptions);
  constructor(type: 'http', options: HttpOptions);
  constructor(type: 'oauth2', options: OAuth2Options);
  constructor(type: 'openIdConnect', options: OpenIdConnectOptions);
  constructor(
    public readonly type: SecurityType,
    private readonly options: SecurityOptions,
  ) {
    this.id = options.id;
    this.errors = options.errors ?? [];

    setSecurityGenerator(this, (locale) => {
      const result = { type: this.type } as OpenAPIV3_1.SecuritySchemeObject;
      switch (result.type) {
        case 'apiKey': {
          const options = this.options as ApiKeyOptions;
          result.in = options.in;
          result.name = options.name;
          if (options.description !== void 0) result.description = options.description[locale];
          break;
        }
        default:
          throw new Error(`Unsupported security type: ${result.type}`);
      }
      return result;
    });
  }
  /**
   * ### 定义安全需求
   * ---
   * @param requirements 安全需求，仅适用于 OAuth2 和 OpenID Connect 类型
   */
  require(...requirements: string[]) {
    return new SecurityRequireDefinition(this, requirements);
  }
}
/**
 * ### 定义 API Key 安全方案
 * ---
 * @param options
 */
export const defineApiKeySecurity = (options: ApiKeyOptions) => new SecurityDefinition('apiKey', options);
/**
 * ### 定义 HTTP 认证安全方案
 * ---
 * @param options
 */
export const defineHttpSecurity = (options: HttpOptions) => new SecurityDefinition('http', options);
/**
 * ### 定义 OAuth2 安全方案
 * ---
 * @param options
 */
export const defineOAuth2Security = (options: OAuth2Options) => new SecurityDefinition('oauth2', options);
/**
 * ### 定义 OpenID Connect 安全方案
 * ---
 * @param options
 */
export const defineOpenIdConnectSecurity = (options: OpenIdConnectOptions) => new SecurityDefinition('openIdConnect', options);
