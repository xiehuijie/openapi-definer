import { z } from 'zod';

export type ZodBasicField = z.ZodString | z.ZodStringFormat | z.ZodNumber | z.ZodNumberFormat | z.ZodBoolean | z.ZodEnum | z.ZodNull;
export type ZodBasicStruct = z.ZodObject<any> | z.ZodArray<ZodFieldType | z.ZodObject<any> | z.ZodArray<any>>;

export type ZodFieldType = ZodBasicField | z.ZodUnion<ZodBasicField[]>;
export type ZodStructType = ZodBasicStruct | z.ZodUnion<ZodBasicStruct[]>;

interface JsonSchemaMeta {
  id: string;
  title?: string;
  description?: string;
  default?: any;
  examples?: any[];
  deprecated?: boolean;
}
type JsonSchemaMetaGenerator = (locale: string) => Omit<JsonSchemaMeta, 'id'>;

const registry = new Set<ZodFieldType | ZodStructType>();
const schema2id = new Map<ZodFieldType | ZodStructType, string>();
const id2schema = new Map<string, ZodFieldType | ZodStructType>();
const json_schema_meta = new Map<ZodFieldType | ZodStructType, JsonSchemaMetaGenerator>();

/**
 * ### 设置 JSON Schema 元数据
 */
export const setJsonSchemaMeta = (id: string, schema: ZodFieldType | ZodStructType, fn: JsonSchemaMetaGenerator) => {
  if (id2schema.has(id)) throw new Error(`Schema with ID "${id}" is already registered.`);
  schema2id.set(schema, id);
  id2schema.set(id, schema);
  json_schema_meta.set(schema, fn);
};

/**
 * ### 获取 JSON Schema 元数据
 */
export const getJsonSchemaMeta = (schema: ZodFieldType | ZodStructType, locale: string): JsonSchemaMeta => {
  if (json_schema_meta.has(schema) === false) {
    throw new Error('JsonSchemaMeta not found');
  } else {
    return { id: schema2id.get(schema)!, ...json_schema_meta.get(schema)!(locale) };
  }
};

/**
 * ### 获取 JSON Schema 引用
 */
export const getJsonSchemaRef = (schema: ZodFieldType | ZodStructType): { $ref: string } => {
  registry.add(schema);
  return { $ref: `#/components/schemas/${schema2id.get(schema)!}` };
};

/**
 * ### 获取多个模式的 AnyOf 引用
 */
export const getAnyOfJsonSchemaRefs = (...schemas: (ZodFieldType | ZodStructType)[]) => {
  return { anyOf: schemas.map((schema) => getJsonSchemaRef(schema)) };
};
