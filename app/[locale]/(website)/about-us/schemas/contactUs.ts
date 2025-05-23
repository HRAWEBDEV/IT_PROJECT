import { z } from 'zod';
import { iranPhoneRegex } from '@/utils/validationRegex';

const contactUsSchema = z.object({
 firstName: z.string().min(1),
 lastName: z.string().min(1),
 email: z.literal('').or(z.string().email()),
 phone: z.string().min(1).regex(iranPhoneRegex),
 description: z.string().min(1),
});

type ContactUsSchema = z.infer<typeof contactUsSchema>;

export { contactUsSchema, type ContactUsSchema };
