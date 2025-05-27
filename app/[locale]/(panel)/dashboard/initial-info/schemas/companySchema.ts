import { z } from 'zod';

const companySchema = z.object({
 ownerName: z.string().min(1),
 postalCode: z.string(),
 nationalCode: z.string(),
 registerNo: z.string(),
 addressName: z.string().min(1),
 descriptionName: z.string().min(1),
 telephone1: z.string(),
 telephone2: z.string(),
 telephone3: z.string(),
 cellPhone1: z.string(),
 cellPhone2: z.string(),
 cellPhone3: z.string(),
 fax: z.string(),
 email: z.string(),
});

type TCompanySchema = z.infer<typeof companySchema>;

export { companySchema, type TCompanySchema };
