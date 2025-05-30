import Services from './components/Services';
import Footer from '../components/footer/Footer';
import { getDictionary } from '@/localization/getDic';
import { AppParams } from '@/utils/appParams';
import {
 type ResponseShape,
 type Service,
 type ServiceCategory,
 serviceCategoriesApi,
 servicesApi,
} from '@/services/api-actions/globalApiActions';
import { locales } from '@/localization/locales';
import { cookies } from 'next/headers';
import { authCookieName } from '@/services/auth/userToken';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams>;
}) => {
 const { locale } = await params;

 const dic = await getDictionary({
  locale,
  path: 'services',
 });

 return {
  title: dic.titles as string,
 };
};

export default async function page({
 params,
 searchParams,
}: {
 params: Promise<AppParams>;
 searchParams: Promise<{
  categoryID?: string;
 }>;
}) {
 const { categoryID } = await searchParams;
 const { locale } = await params;
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'services',
 });

 let services: Service[] = [];
 const servicesParams = new URLSearchParams();
 servicesParams.set('lang', locale);
 servicesParams.set('serviceStateID', '2');
 if (categoryID) {
  servicesParams.set('serviceCategoryID', categoryID);
 }
 servicesParams.set('showForCard', 'true');
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
   const [servicesResult, servicesCategoriesResult] = await Promise.all([
    fetch(
     `${
      process.env.NEXT_PUBLIC_API_BASE_URL
     }${servicesApi}?${servicesParams.toString()}`,
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

   if (servicesResult.ok) {
    const servicesPackage = (await servicesResult.json()) as ResponseShape<{
     Services: Service[];
    }>;
    services = servicesPackage.payload.Services;
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
  <div>
   <Services
    dic={dic}
    serverServices={services}
    serverServicesCategories={servicesCategories}
   />
   <Footer params={params} />
  </div>
 );
}
