import { type Text, createDefaultText } from '../utils/i18n.ts';
import type { HttpStatusCode } from '../types/httpStatus.ts';
import type { ZodStructType } from './_openapi.ts';
import { z } from 'zod';

interface ErrorOptions {
  /**
   * 错误ID `unique`
   * ---
   *
   */
  id: string;
  /**
   * ### HTTP 状态码
   */
  status: HttpStatusCode;
  /**
   * ### 错误代码
   * ---
   * - 用于业务层面区分不同错误的代码
   */
  code: string;
  /**
   * ### 错误消息
   * ---
   * - 此消息用于向客户端传达错误的简要信息
   * - 若不提供此属性，则会默认使用错误ID
   */
  message?: string;
  /**
   * ### 错误名称 `i18n`
   * ---
   * - 用于生成文档中的错误标题
   */
  title?: Text;
  /**
   * ### 错误描述 `i18n` `md`
   * ---
   * - 用于生成文档中的错误描述
   */
  description?: Text;
  /**
   * ### 数据属性
   * ---
   * - 此模式用于定义错误响应中`data`属性的结构
   * - 若不提供此属性，则会默认使用一个空的对象模式
   */
  schema?: ZodStructType;
}

export class ErrorDefinition {
  readonly id: string;
  readonly http: HttpStatusCode;
  readonly code: string;
  readonly message: string;
  readonly title: Text;
  readonly description: Text;
  readonly schema: ZodStructType;

  constructor(options: ErrorOptions) {
    this.id = options.id;
    this.http = options.status;
    this.code = options.code;
    this.message = options.message ?? options.id;
    this.title = options.title ?? createDefaultText(options.id);
    this.description = options.description ?? createDefaultText('');
    this.schema = options.schema ?? z.object({});
  }
}

export const defineError = (options: ErrorOptions) => new ErrorDefinition(options);
