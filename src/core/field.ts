import { z } from 'zod';

interface FieldOptions<T extends z.ZodType> {
  schema: T;
}

export const defineField = <T extends z.ZodType>(options: FieldOptions<T>): T => {
  return options.schema;
};
