import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
 return [
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
   priority: 2,
  },
  {
   url: '/projects',
   lastModified: new Date(),
   changeFrequency: 'daily',
   priority: 3,
  },
  {
   url: '/articles',
   lastModified: new Date(),
   changeFrequency: 'daily',
   priority: 4,
  },
  {
   url: '/contact-us',
   lastModified: new Date(),
   changeFrequency: 'daily',
   priority: 5,
  },
  {
   url: '/about-us',
   lastModified: new Date(),
   changeFrequency: 'daily',
   priority: 6,
  },
 ];
}
