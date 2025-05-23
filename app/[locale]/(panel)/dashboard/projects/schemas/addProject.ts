import { z } from 'zod';

const addProjectSchema = z.object({
 title: z.string().min(1),
 description: z.string().min(1),
 category: z.object({
  id: z.string(),
  name: z.string(),
 }),
});

type AddProjectSchema = z.infer<typeof addProjectSchema>;

export { addProjectSchema, type AddProjectSchema };
