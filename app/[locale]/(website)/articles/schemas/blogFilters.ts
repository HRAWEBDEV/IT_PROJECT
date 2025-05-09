import { z } from 'zod';

const blogFiltersSchema = z.object({
 categoryID: z.object({
  id: z.string(),
  name: z.string(),
 }),
 search: z.string(),
});

type BlogFilters = z.infer<typeof blogFiltersSchema>;

export { blogFiltersSchema, type BlogFilters };
