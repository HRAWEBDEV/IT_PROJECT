import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Projects from './components/projects/Projects';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import {
 type Project,
 projectsApi,
 ResponseShape,
} from '@/services/api-actions/globalApiActions';
import { locales } from '@/localization/locales';
import { paginationLimit } from './utils/blogsPaginationInfo';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams>;
}) => {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'projects',
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
 }>;
}) {
 const { offset, categoryID } = await searchParams;
 const { locale } = await params;
 const activeLocale = locales[locale];
 const dic = await getDictionary({
  locale,
  path: 'projects',
 });
 //
 let projects: Project[] = [];
 const projectsParams = new URLSearchParams();
 projectsParams.set('lang', locale);
 projectsParams.set('projectStateID', '2');
 if (categoryID) {
  projectsParams.set('projectCategoryID', categoryID);
 }
 projectsParams.set('limit', paginationLimit.toString());
 projectsParams.set('offset', offset || '1');

 if (activeLocale.id) {
  try {
   const projectResult = await fetch(
    `${
     process.env.NEXT_PUBLIC_API_BASE_URL
    }${projectsApi}?${projectsParams.toString()}`,
    {
     headers: {
      languageID: activeLocale.id.toString(),
     },
    }
   );
   if (projectResult.ok) {
    const blogsPackage = (await projectResult.json()) as ResponseShape<{
     Projects: Project[];
    }>;
    projects = blogsPackage.payload.Projects;
   }
  } catch {}
 }

 return (
  <div>
   <Hero dic={dic} />
   <Projects dic={dic} serverProjects={projects} />
   <Footer params={params} />
  </div>
 );
}
