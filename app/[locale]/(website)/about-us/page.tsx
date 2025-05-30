import Hero from './components/Hero';
import Footer from '../components/footer/Footer';
import { getDictionary } from '@/localization/getDic';
import {
 type AboutUs,
 type ResponseShape,
 aboutUsApi,
} from '@/services/api-actions/globalApiActions';
import { type AppParams } from '@/utils/appParams';
import { locales } from '@/localization/locales';
import Content from './components/Content';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams>;
}) => {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'about-us',
 });
 return {
  title: dic.title,
 };
};

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'about-us',
 });

 let aboutUs: AboutUs | null = null;
 const aboutUsParams = new URLSearchParams();
 aboutUsParams.set('lang', locale);

 if (activeLocale.id) {
  try {
   const [aboutUsResult] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${aboutUsApi}`, {
     headers: {
      languageID: activeLocale.id.toString(),
     },
    }),
   ]);
   if (aboutUsResult.ok) {
    const aboutUsPackage = (await aboutUsResult.json()) as ResponseShape<{
     AboutUs: AboutUs;
    }>;
    aboutUs = aboutUsPackage.payload.AboutUs;
   }
  } catch {}
 }

 return (
  <div>
   <Hero dic={dic} />
   <Content aboutUs={aboutUs} />
   <Footer params={params} />
  </div>
 );
}
