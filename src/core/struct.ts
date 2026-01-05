import { z } from 'zod';
import type { Text } from '../utils/i18n.ts';
import type { ZodStructType } from './_zod.ts';

interface StructOptions<T extends ZodStructType> {
  /**
   * ### 结构体模式定义 `zod`
   */
  schema: T;
  /**
   * ### 结构体ID `unique`
   */
  id: string;
  /**
   * ### 结构体名称
   */
  title: Text;
  /**
   * ### 结构体描述
   */
  description?: Text;
  /**
   * ### 示例
   *
   * - 此示例用于展示符合该结构体定义的有效值
   * - 该属性源于json schema规范
   */
  examples?: z.infer<T>[];
}

/**
 * ### 定义结构体
 */
export const defineStruct = <T extends ZodStructType>(options: StructOptions<T>): T => {
  if (id_mapping.has(options.id)) {
    throw new Error(`Struct with ID "${options.id}" is already defined.`);
  } else {
    id_mapping.set(options.id, options);
    schema_mapping.set(options.schema, options);
  }
  return options.schema;
};
export { defineStruct as struct };

const id_mapping = new Map<string, StructOptions<ZodStructType>>();
const schema_mapping = new Map<ZodStructType, StructOptions<ZodStructType>>();
