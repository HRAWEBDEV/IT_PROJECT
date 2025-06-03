import { PropsWithChildren } from 'react';
import Banner from './components/Banner';
import {
 type Project,
 projectsApi,
 ResponseShape,
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

 let project: Project | null = null;
 const projectsParams = new URLSearchParams();
 projectsParams.set('lang', locale);
 if (activeLocale.id) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(authCookieName)?.value;
  const fetchHeaders = {
   languageID: activeLocale.id.toString(),
   Authorization: userToken ? `Bearer ${userToken}` : '',
  };
  try {
   const projectsResult = await fetch(
    `${
     process.env.NEXT_PUBLIC_API_BASE_URL
    }${projectsApi}/${name}?${projectsParams.toString()}`,
    {
     headers: fetchHeaders,
    }
   );
   if (projectsResult.ok) {
    const projectsPackage = (await projectsResult.json()) as ResponseShape<{
     Project: Project;
    }>;
    project = projectsPackage.payload.Project;
   }
  } catch {}
 }

 return (
  <div>
   {project ? (
    <>
     <Banner project={project} />
     {children}
    </>
   ) : (
    <NotFoundWrapper />
   )}
  </div>
 );
}
