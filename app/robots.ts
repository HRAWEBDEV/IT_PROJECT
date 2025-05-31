import { type MetadataRoute } from 'next';
import { locales } from '@/localization/locales';

const disallowedPaths = ['/dashboard', '/profile'];
const disallowedPathsWithLocale: string[] = [];
disallowedPaths.forEach((path) => {
 Object.keys(locales).forEach((locale) => {
  disallowedPathsWithLocale.push(`/${locale}${path}`);
 });
});

export default function robots(): MetadataRoute.Robots {
 const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

 return {
  rules: {
   userAgent: '*',
   allow: '/',
   disallow: disallowedPathsWithLocale,
  },
  sitemap: [`${baseUrl}/sitemap.xml`],
 };
}
