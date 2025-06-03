import { Metadata } from 'next';
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
import { authCookieName } from '@/services/auth/userToken';
import { cookies } from 'next/headers';

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
  categoryID?: string;
  searchText?: string;
  tagID?: string;
 }>;
}) {
 const { offset, categoryID, searchText, tagID } = await searchParams;
 const { locale } = await params;
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });
 let blogs: Blog[] = [];
 let rowsCount = 0;
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 blogsParams.set('blogStateID', '2');
 if (categoryID) {
  blogsParams.set('blogCategoryID', categoryID);
 }
 if (searchText) {
  blogsParams.set('searchText', searchText);
 }
 if (tagID) {
  blogsParams.set('tagID', tagID);
 }
 blogsParams.set('limit', paginationLimit.toString());
 blogsParams.set('offset', offset || '1');
 if (activeLocale.id) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(authCookieName)?.value;
  const fetchHeaders = {
   languageID: activeLocale.id.toString(),
   Authorization: userToken ? `Bearer ${userToken}` : '',
  };
  try {
   const blogsResult = await fetch(
    `${
     process.env.NEXT_PUBLIC_API_BASE_URL
    }${blogsApi}?${blogsParams.toString()}`,
    {
     headers: fetchHeaders,
    }
   );
   if (blogsResult.ok) {
    const blogsPackage = (await blogsResult.json()) as ResponseShape<{
     Blogs: PagedResponse<Blog[]>;
    }>;
    blogs = blogsPackage.payload.Blogs.rows;
    rowsCount = blogsPackage.payload.Blogs.rowsCount;
   }
  } catch {}
 }

 return (
  <div>
   <Hero dic={dic} />
   <Articles dic={dic} serverBlogs={blogs} serverRowsCount={rowsCount} />
  </div>
 );
}
