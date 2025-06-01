import { z } from 'zod';
import { iranPhoneRegex } from '@/utils/validationRegex';
import { numberReplacer } from '@/utils/numberReplacer';

const contactUsSchema = z
 .object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.literal('').or(z.string().email()),
  phone: z.string().min(1),
  description: z.string().min(1),
 })
 .refine(
  ({ phone }) => {
   const newValue = numberReplacer(phone);
   return iranPhoneRegex.test(newValue);
  },
  {
   path: ['phone'],
  }
 );

type ContactUsSchema = z.infer<typeof contactUsSchema>;

export { contactUsSchema, type ContactUsSchema };
