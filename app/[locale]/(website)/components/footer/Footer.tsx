import FooterContent from './FooterContent';
import { Owner, ownerApi } from '@/services/api-actions/authApiActionts';
import {
 type ServiceCategory,
 type ProjectCategory,
 serviceCategoriesApi,
 ResponseShape,
 projectCategoriesApi,
} from '@/services/api-actions/globalApiActions';
import { AppParams } from '@/utils/appParams';
import { locales } from '@/localization/locales';
import { cookies } from 'next/headers';
import { authCookieName } from '@/services/auth/userToken';

export default async function Footer({
 params,
}: {
 params: Promise<AppParams>;
}) {
 const { locale } = await params;
 const activeLocale = locales[locale];
 let servicesCategories: ServiceCategory[] = [];
 let projectCategories: ProjectCategory[] = [];
 let owner: Owner | null = null;
 const servicesCategoriesParams = new URLSearchParams();
 servicesCategoriesParams.set('lang', locale);

 if (activeLocale.id) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(authCookieName)?.value;
  const fetchHeaders = {
   languageID: activeLocale.id.toString(),
   Authorization: userToken ? `Bearer ${userToken}` : '',
  };
  try {
   const [servicesCategoriesResult, projectCategoriesResult, ownerResult] =
    await Promise.all([
     fetch(
      `${
       process.env.NEXT_PUBLIC_API_BASE_URL
      }${serviceCategoriesApi}?${servicesCategoriesParams.toString()}`,
      {
       headers: fetchHeaders,
      }
     ),
     fetch(
      `${
       process.env.NEXT_PUBLIC_API_BASE_URL
      }${projectCategoriesApi}?${servicesCategoriesParams.toString()}`,
      {
       headers: fetchHeaders,
      }
     ),
     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ownerApi}`, {
      headers: fetchHeaders,
     }),
    ]);
   if (servicesCategoriesResult.ok) {
    const servicesCategoriesPackage =
     (await servicesCategoriesResult.json()) as ResponseShape<{
      ServiceCategories: ServiceCategory[];
     }>;
    servicesCategories = servicesCategoriesPackage.payload.ServiceCategories;
   }
   if (projectCategoriesResult.ok) {
    const projectCategoriesPackage =
     (await projectCategoriesResult.json()) as ResponseShape<{
      ProjectCategories: ProjectCategory[];
     }>;
    projectCategories = projectCategoriesPackage.payload.ProjectCategories;
   }
   if (ownerResult.ok) {
    const ownerPackage = (await ownerResult.json()) as Owner;
    owner = ownerPackage;
   }
  } catch {}
 }

 return (
  <div>
   <FooterContent
    servicesCategories={servicesCategories}
    projectCategories={projectCategories}
    owner={owner}
   />
  </div>
 );
}
