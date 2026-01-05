import { z } from 'zod';
import { Text } from '../utils/i18n.ts';

export type ZodFieldType = z.ZodString | z.ZodStringFormat | z.ZodNumber | z.ZodNumberFormat | z.ZodBoolean | z.ZodNull;

interface FieldOptions<T extends ZodFieldType> {
  /**
   * ### 字段模式定义 `zod`
   */
  schema: T;
  /**
   * ### 字段ID `unique`
   */
  id: string;
  /**
   * ### 字段名称
   */
  title: Text;
  /**
   * ### 字段描述
   */
  description?: Text;
  /**
   * ### 示例
   */
  examples?: z.infer<T>[];
}

/**
 * ### 定义字段
 */
export const defineField = <T extends ZodFieldType>(options: FieldOptions<T>): T => {
  if (id_mapping.has(options.id)) {
    throw new Error(`Field with ID "${options.id}" is already defined.`);
  } else {
    id_mapping.set(options.id, options);
    schema_mapping.set(options.schema, options);
  }
  return options.schema;
};
export { defineField as field };

const id_mapping = new Map<string, FieldOptions<ZodFieldType>>();
const schema_mapping = new Map<ZodFieldType, FieldOptions<ZodFieldType>>();
