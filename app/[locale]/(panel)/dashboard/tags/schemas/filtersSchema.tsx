import { z } from 'zod';

const filtersSchema = z.object({
 category: z.object({
  id: z.string(),
  name: z.string(),
 }),
});

type FilterSchema = z.infer<typeof filtersSchema>;

export { filtersSchema, type FilterSchema };
