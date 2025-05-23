import { z } from 'zod';

const projectsFiltersSchema = z.object({
 category: z
  .object({
   id: z.string(),
   name: z.string(),
  })
  .nullable(),
 search: z.string(),
});

type ProjectsFilters = z.infer<typeof projectsFiltersSchema>;

export { projectsFiltersSchema, type ProjectsFilters };
