import { z } from 'zod';

const addServiceSchema = z.object({
 title: z.string().min(1),
 description: z.string().min(1),
 category: z.object({
  id: z.string(),
  name: z.string(),
 }),
});

type AddServiceSchema = z.infer<typeof addServiceSchema>;

export { addServiceSchema, type AddServiceSchema };
