import { type MetadataRoute } from 'next';
import { locales } from '@/localization/locales';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://itnetra.com/';
const disallowedPaths = ['/dashboard', '/profile'];
const disallowedPathsWithLocale: string[] = [];
disallowedPaths.forEach((path) => {
 Object.keys(locales).forEach((locale) => {
  disallowedPathsWithLocale.push(`/${locale}${path}`);
 });
});

export default function robots(): MetadataRoute.Robots {
 return {
  rules: {
   userAgent: '*',
   allow: '/',
   disallow: disallowedPathsWithLocale,
  },
  sitemap: [`${baseUrl}/sitemap.xml`],
 };
}
