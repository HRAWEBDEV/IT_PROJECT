import { z } from 'zod';

const changeStateSchema = z.object({
 state: z.object({
  id: z.string(),
  name: z.string(),
 }),
});

type ChangeStateSchema = z.infer<typeof changeStateSchema>;

export { changeStateSchema, type ChangeStateSchema };
