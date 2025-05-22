import { z } from 'zod';

const addCategorySchema = z.object({
 title: z.string().min(1),
 description: z.string().min(1),
});

type AddCategorySchema = z.infer<typeof addCategorySchema>;

export { addCategorySchema, type AddCategorySchema };
