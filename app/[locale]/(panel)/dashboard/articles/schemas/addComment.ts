import { z } from 'zod';

const addCommentSchema = z.object({
 comment: z.string().min(1),
});

type AddCommentSchema = z.infer<typeof addCommentSchema>;

export { addCommentSchema, type AddCommentSchema };
