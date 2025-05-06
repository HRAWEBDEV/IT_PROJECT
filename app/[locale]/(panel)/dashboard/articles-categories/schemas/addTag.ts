import { z } from 'zod';

const addTagSchema = z.object({
 title: z.string().min(1),
 category: z.object({
  id: z.string(),
  name: z.string(),
 }),
});

type AddTagSchema = z.infer<typeof addTagSchema>;

export { addTagSchema, type AddTagSchema };
