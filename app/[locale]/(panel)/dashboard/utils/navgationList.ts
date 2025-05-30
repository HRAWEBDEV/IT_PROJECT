export type NavigationItem = {
 type: string;
 title: string;
 href: string;
 children?: NavigationItem[];
};

export const navigationList: NavigationItem[] = [
 {
  type: 'settings',
  title: 'users',
  href: '/dashboard/settings',
 },
 {
  type: 'initial-info',
  title: 'initialInfo',
  href: '/dashboard/initial-info',
 },
 {
  type: 'tags',
  title: 'tags',
  href: '/dashboard/tags',
 },
 {
  type: 'articles',
  title: 'articles',
  href: '#',
  children: [
   {
    type: 'articles-list',
    title: 'articlesList',
    href: '/dashboard/articles',
   },
   {
    type: 'articles-categories',
    title: 'articlesCategories',
    href: '/dashboard/articles-categories',
   },
  ],
 },
 {
  type: 'services',
  title: 'services',
  href: '#',
  children: [
   {
    type: 'service-list',
    title: 'serviceList',
    href: '/dashboard/services',
   },
   {
    type: 'services-categories',
    title: 'servicesCategories',
    href: '/dashboard/services-categories',
   },
  ],
 },
 {
  type: 'projects',
  title: 'projects',
  href: '#',
  children: [
   {
    type: 'project-list',
    title: 'projectList',
    href: '/dashboard/projects',
   },
   {
    type: 'projects-categories',
    title: 'projectsCategories',
    href: '/dashboard/projects-categories',
   },
  ],
 },
] as const;
