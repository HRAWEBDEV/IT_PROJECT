import { z } from 'zod';

const commentStateSchema = z.object({
 state: z.object({
  id: z.number(),
  name: z.string(),
 }),
 removed: z.boolean(),
});

type CommentState = z.infer<typeof commentStateSchema>;

export { commentStateSchema, type CommentState };
