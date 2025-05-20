import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Articles from './components/articles/Articles';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import {
 type Blog,
 type PagedResponse,
 blogsApi,
 ResponseShape,
} from '@/services/api-actions/globalApiActions';
import { paginationLimit } from './utils/blogsPaginationInfo';
import { locales } from '@/localization/locales';

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
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });

 let blogs: Blog[] = [];
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 blogsParams.set('blogStateID', '1');
 blogsParams.set('limit', paginationLimit.toString());
 blogsParams.set('offset', offset || '1');
 try {
  const blogsResult = await fetch(
   `${
    process.env.NEXT_PUBLIC_API_BASE_URL
   }${blogsApi}?${blogsParams.toString()}`,
   {
    headers: {
     languageID: activeLocale.id.toString(),
    },
   }
  );
  if (blogsResult.ok) {
   const blogsPackage = (await blogsResult.json()) as ResponseShape<{
    Blogs: PagedResponse<Blog[]>;
   }>;
   blogs = blogsPackage.payload.Blogs.rows;
  }
 } catch {}

 return (
  <div>
   <Hero dic={dic} />
   <Articles dic={dic} serverBlogs={blogs} />
   <Footer />
  </div>
 );
}
