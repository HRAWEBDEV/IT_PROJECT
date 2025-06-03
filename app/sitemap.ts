import { type MetadataRoute } from 'next';
import { locales } from '@/localization/locales';
// Get base URL from environment variables
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://itnetra.com/';
const fixedPagesInfo = [
 {
  url: '',
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 1,
 },
 {
  url: '/co-services',
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 0.8,
 },
 {
  url: '/projects',
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 0.8,
 },
 {
  url: '/articles',
  lastModified: new Date(),
  changeFrequency: 'daily',
  priority: 0.7,
 },
 {
  url: '/contact-us',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.6,
 },
 {
  url: '/about-us',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.6,
 },
];

const fixedPagesSiteMap: MetadataRoute.Sitemap = [];

Object.keys(locales).forEach((locale) => {
 fixedPagesInfo.forEach((page) => {
  fixedPagesSiteMap.push({
   url: `${baseUrl}/${locale}${page.url}`,
   lastModified: page.lastModified,
   changeFrequency:
    page.changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
   priority: page.priority,
  });
 });
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 return [...fixedPagesSiteMap];
}
