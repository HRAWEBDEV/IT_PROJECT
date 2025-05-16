import { z } from 'zod';

const changeStateSchema = z.object({
 state: z
  .object({
   id: z.number(),
   name: z.string(),
  })
  .nullable(),
});

type ChangeStateSchema = z.infer<typeof changeStateSchema>;

export { changeStateSchema, type ChangeStateSchema };
