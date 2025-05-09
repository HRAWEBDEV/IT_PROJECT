import { z } from 'zod';

const blogFiltersSchema = z.object({
 category: z
  .object({
   id: z.string(),
   name: z.string(),
  })
  .nullable(),
 search: z.string(),
});

type BlogFilters = z.infer<typeof blogFiltersSchema>;

export { blogFiltersSchema, type BlogFilters };
