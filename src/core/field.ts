import { z } from 'zod';
import type { Text } from '../utils/i18n.ts';
import { type ZodFieldType, setJsonSchemaMeta } from './_openapi.ts';

interface FieldOptions<T extends ZodFieldType> {
  /**
   * ### 字段模式定义 `zod`
   */
  schema: T;
  /**
   * ### 字段ID `unique`
   * ---
   * - 此ID用于在应用内唯一标识该`zod`模式定义，与结构体ID使用相同命名空间
   */
  id: string;
  /**
   * ### 字段名称
   */
  title?: Text;
  /**
   * ### 字段描述
   */
  description?: Text;
  /**
   * ### 默认值
   * ---
   * - 此值用于指定该字段的默认值
   * - 填写默认值后，该字段将被视为可选字段
   * - 默认值也被视为一个有效值示例
   * - 该属性源于`JSON Schema`规范
   */
  default?: z.infer<T>;
  /**
   * ### 示例
   * ---
   * - 此示例用于展示符合该字段定义的有效值示例
   * - 该属性源于`JSON Schema`规范
   */
  examples?: z.infer<T>[];
  /**
   * ### 弃用标记
   * ---
   * - 表明该字段不宜使用，并可能在将来被移除
   * - 该属性源于`JSON Schema`规范
   */
  deprecated?: boolean;
}

/**
 * ### 定义字段
 */
export const defineField = <T extends ZodFieldType>(options: FieldOptions<T>): T => {
  setJsonSchemaMeta(options.id, options.schema, (locale) => ({
    title: options.title === void 0 ? options.id : options.title[locale],
    description: options.description?.[locale],
    default: options.default,
    examples: options.examples,
    deprecated: options.deprecated,
  }));
  return options.schema;
};
