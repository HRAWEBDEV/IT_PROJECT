import { PropsWithChildren } from 'react';
import Banner from './components/Banner';
import Footer from '../../components/footer/Footer';
import {
 ResponseShape,
 Service,
 servicesApi,
} from '@/services/api-actions/globalApiActions';
import { AppParams } from '@/utils/appParams';
import NotFoundWrapper from '@/app/[locale]/[...not-found]/components/NotFoundWrapper';
import { locales } from '@/localization/locales';

export default async function layout({
 children,
 params,
}: PropsWithChildren<{ params: Promise<AppParams & { name: string }> }>) {
 const { locale, name } = await params;
 const activeLocale = locales[locale];

 let service: Service | null = null;
 const serviceParams = new URLSearchParams();
 serviceParams.set('lang', locale);

 if (activeLocale.id) {
  try {
   const [serviceResult] = await Promise.all([
    fetch(
     `${
      process.env.NEXT_PUBLIC_API_BASE_URL
     }${servicesApi}/${name}?${serviceParams.toString()}`,
     {
      headers: {
       languageID: activeLocale.id.toString(),
      },
     }
    ),
   ]);
   if (serviceResult.ok) {
    const servicePackage = (await serviceResult.json()) as ResponseShape<{
     Service: Service;
    }>;
    service = servicePackage.payload.Service;
   }
  } catch {}
 }

 return (
  <div>
   {service ? (
    <>
     <Banner service={service} />
     {children}
     <Footer params={params} />
    </>
   ) : (
    <NotFoundWrapper />
   )}
  </div>
 );
}
