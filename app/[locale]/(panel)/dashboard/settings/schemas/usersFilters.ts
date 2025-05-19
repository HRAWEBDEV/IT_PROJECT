import { z } from 'zod';

const usersFiltersSchema = z.object({
 search: z.string(),
 verified: z.boolean(),
 disabled: z.boolean(),
 blackList: z.boolean(),
});

type UsersFiltersSchema = z.infer<typeof usersFiltersSchema>;

export { type UsersFiltersSchema, usersFiltersSchema };
