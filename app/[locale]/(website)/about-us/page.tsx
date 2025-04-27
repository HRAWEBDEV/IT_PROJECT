import Hero from './components/Hero';
import ContactUs from './components/ContactUs';
import Footer from '../components/footer/Footer';
import { Metadata } from 'next';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | درباره ما',
};

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'about-us',
 });
 return (
  <div>
   <Hero dic={dic} />
   <ContactUs dic={dic} />
   <Footer />
  </div>
 );
}
