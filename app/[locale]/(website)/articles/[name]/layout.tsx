import { PropsWithChildren } from 'react';
import Banner from './components/Banner';
import Footer from '../../components/footer/Footer';
import {
 blogsApi,
 ResponseShape,
 type Blog,
} from '@/services/api-actions/globalApiActions';
import { AppParams } from '@/utils/appParams';
import NotFoundWrapper from '@/app/[locale]/[...not-found]/components/NotFoundWrapper';

export default async function layout({
 children,
 params,
}: PropsWithChildren<{ params: Promise<AppParams & { name: string }> }>) {
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
  if (blogsResult.ok) {
   const blogsPackage = (await blogsResult.json()) as ResponseShape<{
    Blog: Blog;
   }>;
   blog = blogsPackage.payload.Blog;
  }
 } catch {}

 return (
  <div>
   {blog ? (
    <>
     <Banner blog={blog} />
     {children}
     <Footer />
    </>
   ) : (
    <NotFoundWrapper />
   )}
  </div>
 );
}
