import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Articles from './components/articles/Articles';
import Projects from './components/projects/Projects';
import Footer from './components/footer/Footer';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import {
 type Blog,
 type Service,
 type Project,
 type ServiceCategory,
 type ResponseShape,
 blogsApi,
 projectsApi,
 servicesApi,
 serviceCategoriesApi,
} from '@/services/api-actions/globalApiActions';
import { locales } from '@/localization/locales';

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const activeLocale = locales[locale];

 const dic = await getDictionary({
  locale,
  path: 'home',
 });
 let blogs: Blog[] = [];
 const blogsParams = new URLSearchParams();
 blogsParams.set('lang', locale);
 blogsParams.set('blogStateID', '2');
 blogsParams.set('showForCard', 'true');
 if (activeLocale.id) {
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
     Blogs: Blog[];
    }>;
    blogs = blogsPackage.payload.Blogs;
   }
  } catch {}
 }

 let projects: Project[] = [];
 const projectsParams = new URLSearchParams();
 projectsParams.set('lang', locale);
 projectsParams.set('blogStateID', '2');
 projectsParams.set('showForCard', 'true');

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

 let services: Service[] = [];
 const servicesParams = new URLSearchParams();
 servicesParams.set('lang', locale);
 servicesParams.set('blogStateID', '2');
 servicesParams.set('showForCard', 'true');
 if (activeLocale.id) {
  try {
   const servicesResult = await fetch(
    `${
     process.env.NEXT_PUBLIC_API_BASE_URL
    }${servicesApi}?${servicesParams.toString()}`,
    {
     headers: {
      languageID: activeLocale.id.toString(),
     },
    }
   );
   if (servicesResult.ok) {
    const servicesPackage = (await servicesResult.json()) as ResponseShape<{
     Services: Service[];
    }>;
    services = servicesPackage.payload.Services;
   }
  } catch {}
 }

 let servicesCategories: ServiceCategory[] = [];
 const servicesCategoriesParams = new URLSearchParams();
 servicesCategoriesParams.set('lang', locale);
 if (activeLocale.id) {
  try {
   const servicesCategoriesResult = await fetch(
    `${
     process.env.NEXT_PUBLIC_API_BASE_URL
    }${serviceCategoriesApi}?${servicesCategoriesParams.toString()}`,
    {
     headers: {
      languageID: activeLocale.id.toString(),
     },
    }
   );
   if (servicesCategoriesResult.ok) {
    const servicesCategoriesPackage =
     (await servicesCategoriesResult.json()) as ResponseShape<{
      ServiceCategories: ServiceCategory[];
     }>;
    servicesCategories = servicesCategoriesPackage.payload.ServiceCategories;
   }
  } catch {}
 }

 return (
  <div id='home-page'>
   <Hero dic={dic} />
   <Services
    dic={dic}
    services={services}
    servicesCategories={servicesCategories}
   />
   <Projects dic={dic} projects={projects} />
   <Articles dic={dic} serverBlogs={blogs} />
   <Footer />
  </div>
 );
}
