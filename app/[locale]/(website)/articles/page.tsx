import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Articles from './components/articles/Articles';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | اخبار و مقاله‌ها',
};

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });

 return (
  <div>
   <Hero dic={dic} />
   <Articles dic={dic} />
   <Footer />
  </div>
 );
}
