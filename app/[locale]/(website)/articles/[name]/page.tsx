import WhyUs from './components/WhyUs';
import Content from './components/Content';
import CommentSection from './components/comments/CommentSection';
import { type AppParams } from '@/utils/appParams';
import {
 type Blog,
 blogsApi,
 ResponseShape,
} from '@/services/api-actions/globalApiActions';

export default async function page({
 params,
}: {
 params: Promise<AppParams & { name: string }>;
}) {
 const { locale, name } = await params;

 let blog: Blog | null = null;
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 try {
  const blogsResult = await fetch(
   `${
    process.env.NEXT_PUBLIC_API_BASE_URL
   }${blogsApi}/${name}?${blogsParams.toString()}`
  );
  const blogsPackage = (await blogsResult.json()) as ResponseShape<{
   Blog: Blog;
  }>;
  blog = blogsPackage.payload.Blog;
 } catch {}

 return (
  <section>
   <Content blog={blog} />
   <WhyUs />
   <CommentSection />
  </section>
 );
}
