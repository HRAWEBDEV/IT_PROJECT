import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Articles from './components/articles/Articles';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import { type Blog, blogsApi } from '@/services/api-actions/globalApiActions';
import { paginationLimit } from './utils/blogsPaginationInfo';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams>;
}): Promise<Metadata> => {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });

 return {
  title: dic.title as string,
 };
};

export default async function page({
 params,
 searchParams,
}: {
 params: Promise<AppParams>;
 searchParams: Promise<{
  offset?: string;
 }>;
}) {
 const { offset } = await searchParams;
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });

 let blogs: Blog[] = [];
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 blogsParams.set('showForCard', 'true');
 blogsParams.set('blogStateID', '1');
 blogsParams.set('limit', paginationLimit.toString());
 blogsParams.set('offset', offset || '1');
 const blogsResult = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}${blogsApi}?${blogsParams.toString()}`
 );
 try {
  blogs = await blogsResult.json();
 } catch {}
 console.log(blogs);

 return (
  <div>
   <Hero dic={dic} />
   <Articles dic={dic} />
   <Footer />
  </div>
 );
}
