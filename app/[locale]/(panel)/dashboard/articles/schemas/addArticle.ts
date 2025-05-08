import { z } from 'zod';

const addArticleSchema = z.object({
 title: z.string().min(1),
 description: z.string().min(1),
 category: z.object({
  id: z.string(),
  name: z.string(),
 }),
});

type AddArticleSchema = z.infer<typeof addArticleSchema>;

export { addArticleSchema, type AddArticleSchema };
