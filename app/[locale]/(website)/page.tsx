import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Articles from './components/articles/Articles';
import Projects from './components/projects/Projects';
import Footer from './components/footer/Footer';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'home',
 });
 const layoutDic = await getDictionary({
  locale,
  path: 'layout',
 });
 return (
  <div id='home-page'>
   <Hero dic={dic} />
   <Services dic={dic} />
   <Projects dic={dic} />
   <Articles dic={dic} />
   <Footer />
  </div>
 );
}
