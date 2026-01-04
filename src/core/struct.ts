import { z } from 'zod';

interface StructOptions<T extends z.ZodObject> {
  schema: T;
}

export const defineField = <T extends z.ZodObject>(options: StructOptions<T>): T => {
  return options.schema;
};
