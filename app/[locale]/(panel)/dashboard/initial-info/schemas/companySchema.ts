import { numberReplacer } from '@/utils/numberReplacer';
import { z } from 'zod';

const companySchema = z.object({
 ownerName: z.string().min(1),
 postalCode: z.string(),
 nationalCode: z.string(),
 registerNo: z.string(),
 addressName: z.string().min(1),
 descriptionName: z.string().min(1),
 telephone1: z.string().transform(numberReplacer),
 telephone2: z.string().transform(numberReplacer),
 telephone3: z.string().transform(numberReplacer),
 cellPhone1: z.string().transform(numberReplacer),
 cellPhone2: z.string().transform(numberReplacer),
 cellPhone3: z.string().transform(numberReplacer),
 fax: z.string(),
 email: z.string(),
});

type TCompanySchema = z.infer<typeof companySchema>;

export { companySchema, type TCompanySchema };
