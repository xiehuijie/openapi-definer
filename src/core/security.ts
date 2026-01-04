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
interface HttpOptions extends BaseOptions {}

class SecurityDefinition {
  constructor(type: 'apiKey', options: ApiKeyOptions);
  constructor(type: SecurityType, options: ApiKeyOptions) {}
}

export const defineApiKeySecurity = (options: ApiKeyOptions) => new SecurityDefinition('apiKey', options);
