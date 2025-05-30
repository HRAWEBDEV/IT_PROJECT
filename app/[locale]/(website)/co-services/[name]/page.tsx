import Content from './components/Content';
import { type AppParams } from '@/utils/appParams';
import {
 type Service,
 type ServiceCategory,
 servicesApi,
 serviceCategoriesApi,
 ResponseShape,
} from '@/services/api-actions/globalApiActions';
import Tags from './components/Tags';
import { getDictionary } from '@/localization/getDic';
import { locales } from '@/localization/locales';
import WhyUs from '@/app/[locale]/(website)/components/WhyUs';
import { cookies } from 'next/headers';
import { authCookieName } from '@/services/auth/userToken';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams & { name: string }>;
}) => {
 const { locale } = await params;
 const dictionary = await getDictionary({
  locale,
  path: 'articles',
 });
 return {
  title: dictionary.title,
  description: dictionary.description,
 };
};

export default async function page({
 params,
}: {
 params: Promise<AppParams & { name: string }>;
}) {
 const { locale, name } = await params;
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });

 let service: Service | null = null;
 const serviceParams = new URLSearchParams();
 serviceParams.set('lang', locale);

 let servicesCategories: ServiceCategory[] = [];
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
   const [serviceResult, servicesCategoriesResult] = await Promise.all([
    fetch(
     `${
      process.env.NEXT_PUBLIC_API_BASE_URL
     }${servicesApi}/${name}?${serviceParams.toString()}`,
     {
      headers: fetchHeaders,
     }
    ),
    fetch(
     `${
      process.env.NEXT_PUBLIC_API_BASE_URL
     }${serviceCategoriesApi}?${servicesCategoriesParams.toString()}`,
     {
      headers: fetchHeaders,
     }
    ),
   ]);
   if (serviceResult.ok) {
    const servicePackage = (await serviceResult.json()) as ResponseShape<{
     Service: Service;
    }>;
    service = servicePackage.payload.Service;
   }
   if (servicesCategoriesResult.ok) {
    const servicesCategoriesPackage =
     (await servicesCategoriesResult.json()) as ResponseShape<{
      ServiceCategories: ServiceCategory[];
     }>;
    servicesCategories = servicesCategoriesPackage.payload.ServiceCategories;
   }
  } catch {}
 }

 return (
  <section>
   <Content service={service} dic={dic} />
   <Tags tags={servicesCategories} dic={dic} />
   <WhyUs />
  </section>
 );
}
