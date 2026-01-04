import { z } from 'zod';

interface StructOptions<T extends z.ZodObject> {
  schema: T;
}

export const defineStruct = <T extends z.ZodObject>(options: StructOptions<T>): T => {
  return options.schema;
};
