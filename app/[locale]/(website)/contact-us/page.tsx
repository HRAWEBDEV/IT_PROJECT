import Hero from './components/Hero';
import ContactUs from './components/ContactUs';
import Footer from '../components/footer/Footer';
import { getDictionary } from '@/localization/getDic';
import { type Owner, ownerApi } from '@/services/api-actions/authApiActionts';
import { type AppParams } from '@/utils/appParams';
import { locales } from '@/localization/locales';

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

 let owner: Owner | null = null;
 const servicesCategoriesParams = new URLSearchParams();
 servicesCategoriesParams.set('lang', locale);

 if (activeLocale.id) {
  try {
   const [ownerResult] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${ownerApi}`, {
     headers: {
      languageID: activeLocale.id.toString(),
     },
    }),
   ]);
   if (ownerResult.ok) {
    const ownerPackage = (await ownerResult.json()) as Owner;
    owner = ownerPackage;
   }
  } catch {}
 }

 return (
  <div>
   <Hero dic={dic} />
   <ContactUs dic={dic} owner={owner} />
   <Footer params={params} />
  </div>
 );
}
