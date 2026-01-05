import type { Text } from '../utils/i18n.ts';
import type { HttpStatusCode } from '../types/httpStatus.ts';
import type { ZodStructType } from './_zod.ts';

interface ErrorOptions {
  /**
   * 错误ID `unique`
   */
  id: string;
  /**
   * ### HTTP 状态码
   */
  http: HttpStatusCode;
  /**
   * ### 错误名称
   */
  name?: Text;
  /**
   * ### 错误描述 `i18n`
   */
  description?: Text;
  /**
   * ### 数据属性
   */
  schema?: ZodStructType;
}

export class ErrorDefinition {
  private options: ErrorOptions;
  constructor(options: ErrorOptions) {
    this.options = options;
  }
  get id() {
    return this.options.id;
  }
}

export const defineError = (options: ErrorOptions) => new ErrorDefinition(options);
