import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Articles from './components/articles/Articles';
import Projects from './components/projects/Projects';
import Footer from './components/footer/Footer';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import { type Blog, blogsApi } from '@/services/api-actions/globalApiActions';

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'home',
 });
 let blogs: Blog[] = [];
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 blogsParams.set('showForCard', 'true');
 const blogsResult = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}${blogsApi}?${blogsParams.toString()}`
 );
 try {
  blogs = await blogsResult.json();
 } catch {}

 return (
  <div id='home-page'>
   <Hero dic={dic} />
   <Services dic={dic} />
   <Projects dic={dic} />
   <Articles dic={dic} blogs={blogs} />
   <Footer />
  </div>
 );
}
