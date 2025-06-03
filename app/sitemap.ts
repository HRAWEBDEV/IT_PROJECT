import { type MetadataRoute } from 'next';
import { locales } from '@/localization/locales';
import {
 type ResponseShape,
 blogsIdsApi,
 projectsIdsApi,
 servicesIdsApi,
} from '@/services/api-actions/globalApiActions';
// Get base URL from environment variables
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://itnetra.com/';
const fixedPagesInfo = [
 {
  url: '',
  changeFrequency: 'monthly',
  priority: 1,
 },
 {
  url: '/co-services',
  changeFrequency: 'monthly',
  priority: 0.8,
 },
 {
  url: '/projects',
  changeFrequency: 'monthly',
  priority: 0.8,
 },
 {
  url: '/articles',
  changeFrequency: 'monthly',
  priority: 0.7,
 },
 {
  url: '/contact-us',
  changeFrequency: 'monthly',
  priority: 0.6,
 },
 {
  url: '/about-us',
  changeFrequency: 'monthly',
  priority: 0.6,
 },
];

const fixedPagesSiteMap: MetadataRoute.Sitemap = [];

Object.keys(locales).forEach((locale) => {
 fixedPagesInfo.forEach((page) => {
  fixedPagesSiteMap.push({
   url: `${baseUrl}/${locale}${page.url}`,
   changeFrequency:
    page.changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
   priority: page.priority,
  });
 });
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const blogSiteMap: MetadataRoute.Sitemap = [];
 const serviceSiteMap: MetadataRoute.Sitemap = [];
 const projectSiteMap: MetadataRoute.Sitemap = [];
 const headers = {
  languageID: '1',
 };
 try {
  const [blogIdsPackage, serviceIdsPackage, projectIdsPackage] =
   await Promise.all([
    fetch(blogsIdsApi, {
     headers,
    }),
    fetch(servicesIdsApi, {
     headers,
    }),
    fetch(projectsIdsApi, {
     headers,
    }),
   ]);
  if (blogIdsPackage.ok) {
   const blogIdsRes = (await blogIdsPackage.json()) as ResponseShape<{
    BlogIds: number[];
   }>;
   blogIdsRes.payload.BlogIds.forEach((id) => {
    blogSiteMap.push({
     url: `${baseUrl}/articles/${id}`,
     changeFrequency: 'daily',
     priority: 1,
    });
   });
  }
  if (serviceIdsPackage.ok) {
   const serviceIdsRes = (await serviceIdsPackage.json()) as ResponseShape<{
    ServiceIds: number[];
   }>;
   serviceIdsRes.payload.ServiceIds.forEach((id) => {
    serviceSiteMap.push({
     url: `${baseUrl}/co-services/${id}`,
     changeFrequency: 'daily',
     priority: 1,
    });
   });
  }
  if (projectIdsPackage.ok) {
   const projectIdsRes = (await projectIdsPackage.json()) as ResponseShape<{
    ProjectIds: number[];
   }>;
   projectIdsRes.payload.ProjectIds.forEach((id) => {
    serviceSiteMap.push({
     url: `${baseUrl}/projects/${id}`,
     changeFrequency: 'daily',
     priority: 1,
    });
   });
  }
 } catch {}
 return [
  ...fixedPagesSiteMap,
  ...blogSiteMap,
  ...serviceSiteMap,
  ...projectSiteMap,
 ];
}
