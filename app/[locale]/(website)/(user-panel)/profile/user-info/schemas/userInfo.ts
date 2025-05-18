import { z } from 'zod';

const userInfoSchema = z.object({
 firstName: z.string().min(1),
 lastName: z.string().min(1),
 cellPhone: z.string().min(1),
 email: z.string().email().or(z.literal('')),
});

type UserInfoSchema = z.infer<typeof userInfoSchema>;

export { userInfoSchema, type UserInfoSchema };
