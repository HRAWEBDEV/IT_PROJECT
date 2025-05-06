export type NavigationItem = {
 type: string;
 title: string;
 href: string;
 children?: NavigationItem[];
};

export const navigationList: NavigationItem[] = [
 {
  type: 'settings',
  title: 'settings',
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
] as const;
