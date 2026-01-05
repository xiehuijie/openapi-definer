import { z } from 'zod';

export type ZodBasicType =
  | z.ZodString
  | z.ZodStringFormat
  | z.ZodNumber
  | z.ZodNumberFormat
  | z.ZodBoolean
  | z.ZodEnum
  | z.ZodNull;

export type ZodFieldType = ZodBasicType | z.ZodUnion<ZodBasicType[]>;
export type ZodStructType = z.ZodObject<any> | z.ZodArray<ZodFieldType | z.ZodObject<any> | z.ZodArray<any>>;

export const _registry = z.registry<{}>();
