import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Projects from './components/projects/Projects';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | پروژه‌ها',
};

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'projects',
 });
 return (
  <div>
   <Hero dic={dic} />
   <Projects dic={dic} />
   <Footer />
  </div>
 );
}
