import { z } from 'zod';
import type { Text } from '../utils/i18n.ts';
import type { ZodStructType } from './_zod.ts';
import { setJsonSchemaMeta } from './_zod.ts';

interface StructOptions<T extends ZodStructType> {
  /**
   * ### 结构体模式定义 `zod`
   */
  schema: T;
  /**
   * ### 结构体ID `unique`
   * ---
   * - 此ID用于在应用内唯一标识该`zod`模式定义，与字段ID使用相同命名空间
   */
  id: string;
  /**
   * ### 结构体名称
   */
  title?: Text;
  /**
   * ### 结构体描述
   */
  description?: Text;
  /**
   * ### 默认值
   * ---
   * - 此值用于指定该结构体的默认值
   * - 填写默认值后，该结构体将被视为可选结构体
   * - 默认值也被视为一个有效值示例
   * - 该属性源于`JSON Schema`规范
   */
  default?: z.infer<T>;
  /**
   * ### 示例
   * ---
   * - 此示例用于展示符合该结构体定义的有效值
   * - 该属性源于`JSON Schema`规范
   */
  examples?: z.infer<T>[];
  /**
   * ### 弃用标记
   * ---
   * - 表明该结构体不宜使用，并可能在将来被移除
   * - 该属性源于`JSON Schema`规范
   */
  deprecated?: boolean;
}

/**
 * ### 定义结构体
 */
export const defineStruct = <T extends ZodStructType>(options: StructOptions<T>): T => {
  setJsonSchemaMeta(options.id, options.schema, (locale) => ({
    title: options.title === void 0 ? options.id : options.title[locale],
    description: options.description?.[locale],
    default: options.default,
    examples: options.examples,
    deprecated: options.deprecated,
  }));
  return options.schema;
};
