import Content from './components/Content';
import { type AppParams } from '@/utils/appParams';
import {
 type Project,
 type ProjectTag,
 projectsApi,
 projectTagsApi,
 ResponseShape,
} from '@/services/api-actions/globalApiActions';
import Tags from './components/Tags';
import { getDictionary } from '@/localization/getDic';
import { locales } from '@/localization/locales';
import WhyUs from '@/app/[locale]/(website)/components/WhyUs';
import { cookies } from 'next/headers';
import { authCookieName } from '@/services/auth/userToken';

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
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'projects',
 });

 let projectTags: ProjectTag[] = [];
 let project: Project | null = null;

 const projectTagsParams = new URLSearchParams();
 projectTagsParams.set('lang', locale);
 projectTagsParams.set('projectID', name);

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
   const [projectResult, projectTagsResult] = await Promise.all([
    fetch(
     `${
      process.env.NEXT_PUBLIC_API_BASE_URL
     }${projectsApi}/${name}?${projectsParams.toString()}`,
     {
      headers: fetchHeaders,
     }
    ),
    fetch(
     `${
      process.env.NEXT_PUBLIC_API_BASE_URL
     }${projectTagsApi}?${projectTagsParams.toString()}`,
     {
      headers: fetchHeaders,
     }
    ),
   ]);
   if (projectResult.ok) {
    const projectsPackage = (await projectResult.json()) as ResponseShape<{
     Project: Project;
    }>;
    project = projectsPackage.payload.Project;
   }

   if (projectTagsResult.ok) {
    const projectTagsPackage =
     (await projectTagsResult.json()) as ResponseShape<{
      ProjectTags: ProjectTag[];
     }>;
    projectTags = projectTagsPackage.payload.ProjectTags;
   }
  } catch {}
 }

 return (
  <section>
   <Content project={project} dic={dic} />
   <Tags tags={projectTags} dic={dic} />
   <WhyUs />
  </section>
 );
}
