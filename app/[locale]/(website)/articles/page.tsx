import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Articles from './components/articles/Articles';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import {
 type ResponseShape,
 type PagedResponse,
 type BlogCategory,
 blogCategoriesApi,
} from '@/services/api-actions/globalApiActions';
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
  search?: string;
  categoryID?: string;
  categoryName?: string;
  limit?: string;
  offset?: string;
 }>;
}) {
 const queries = await searchParams;
 const { locale } = await params;
 // let blogResponse: ResponseShape<{
 //  Blogs: Blog[];
 // }> | null = null;
 let categoryID = queries.categoryID;

 if (!categoryID) {
  const params = new URLSearchParams();
  params.append('lang', locale);
  params.append('limit', '1');
  params.append('offset', '1');
  const blogCategoriesResult = await fetch(
   `${
    process.env.NEXT_PUBLIC_API_BASE_URL
   }${blogCategoriesApi}?${params.toString()}`,
   {
    method: 'GET',
   }
  );
  const blogCategories = (await blogCategoriesResult.json()) as ResponseShape<{
   BlogCategories: PagedResponse<BlogCategory[]>;
  }>;
  categoryID = blogCategories.payload.BlogCategories.rows[0].id.toString();
 }

 if (categoryID) {
  const params = new URLSearchParams();
  params.append('lang', locale);
  params.append('limit', queries.limit || paginationLimit.toString());
  params.append('offset', queries.offset || '1');
  params.append('blogStateID', '1');
  params.append('blogCategoryID', categoryID);
  // const blogsResult = await fetch(
  //  `${process.env.NEXT_PUBLIC_API_BASE_URL}${blogsApi}?${params.toString()}`,
  //  {
  //   method: 'GET',
  //  }
  // );
  // const blogs = (await blogsResult.json()) as ResponseShape<{
  //  BlogCategories: PagedResponse<BlogCategory[]>;
  // }>;
 }

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
