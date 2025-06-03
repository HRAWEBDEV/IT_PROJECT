import { PropsWithChildren } from 'react';
import Banner from './components/Banner';
import {
 blogsApi,
 ResponseShape,
 type Blog,
} from '@/services/api-actions/globalApiActions';
import { AppParams } from '@/utils/appParams';
import NotFoundWrapper from '@/app/[locale]/[...not-found]/components/NotFoundWrapper';
import { locales } from '@/localization/locales';
import { cookies } from 'next/headers';
import { authCookieName } from '@/services/auth/userToken';

export default async function layout({
 children,
 params,
}: PropsWithChildren<{ params: Promise<AppParams & { name: string }> }>) {
 const { locale, name } = await params;
 const activeLocale = locales[locale];

 let blog: Blog | null = null;
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
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
    }${blogsApi}/${name}?${blogsParams.toString()}`,
    {
     headers: fetchHeaders,
    }
   );
   if (blogsResult.ok) {
    const blogsPackage = (await blogsResult.json()) as ResponseShape<{
     Blog: Blog;
    }>;
    blog = blogsPackage.payload.Blog;
   }
  } catch {}
 }

 return (
  <div>
   {blog ? (
    <>
     <Banner blog={blog} />
     {children}
    </>
   ) : (
    <NotFoundWrapper />
   )}
  </div>
 );
}
