import WhyUs from './components/WhyUs';
import Content from './components/Content';
import CommentSection from './components/comments/CommentSection';
import { type AppParams } from '@/utils/appParams';
import {
 type Blog,
 type BlogTag,
 blogsApi,
 getBlogTagsApi,
 ResponseShape,
} from '@/services/api-actions/globalApiActions';
import Tags from './components/Tags';
import { getDictionary } from '@/localization/getDic';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams & { name: string }>;
}) => {
 const { locale } = await params;
 const dictionary = await getDictionary({
  locale,
  path: 'articles',
 });
 return {
  title: dictionary.title,
  description: dictionary.description,
 };
};

export default async function page({
 params,
}: {
 params: Promise<AppParams & { name: string }>;
}) {
 const { locale, name } = await params;
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });
 let blogTags: BlogTag[] = [];
 let blog: Blog | null = null;
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 try {
  const blogsResult = await fetch(
   `${
    process.env.NEXT_PUBLIC_API_BASE_URL
   }${blogsApi}/${name}?${blogsParams.toString()}`
  );
  if (blogsResult.ok) {
   const blogsPackage = (await blogsResult.json()) as ResponseShape<{
    Blog: Blog;
   }>;
   blog = blogsPackage.payload.Blog;
  }
 } catch {}

 const blogTagsParams = new URLSearchParams();
 blogTagsParams.set('lang', locale);
 blogTagsParams.set('blogID', name);
 try {
  const blogTagsResult = await fetch(
   `${
    process.env.NEXT_PUBLIC_API_BASE_URL
   }${getBlogTagsApi}?${blogTagsParams.toString()}`
  );
  if (blogTagsResult.ok) {
   const blogTagsPackage = (await blogTagsResult.json()) as ResponseShape<{
    BlogTags: BlogTag[];
   }>;
   blogTags = blogTagsPackage.payload.BlogTags;
  }
 } catch {}

 return (
  <section>
   <Content blog={blog} dic={dic} />
   <Tags tags={blogTags} dic={dic} />
   <WhyUs dic={dic} />
   <CommentSection dic={dic} blog={blog} />
  </section>
 );
}
