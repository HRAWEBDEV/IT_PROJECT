import { z } from 'zod';

const contactUsFiltersSchema = z.object({
 search: z.string(),
 isRead: z.boolean(),
 deleted: z.boolean(),
});

type ContactUsFiltersSchema = z.infer<typeof contactUsFiltersSchema>;

export { type ContactUsFiltersSchema, contactUsFiltersSchema };
