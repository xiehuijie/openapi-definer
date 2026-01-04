import type { Text } from '../i18n.ts';

interface ErrorOptions {
  /** 全局唯一的错误ID */
  id: string;
  /** HTTP 状态码 */
  httpStatus: number;
  /** 错误描述 */
  description: Text;
}

class ErrorDefinition {
  private options: ErrorOptions;
  constructor(options: ErrorOptions) {
    this.options = options;
  }
  get id() {
    return this.options.id;
  }
}

export const defineError = (options: ErrorOptions) => new ErrorDefinition(options);
