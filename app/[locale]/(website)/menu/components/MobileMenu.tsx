'use client';
import Link from 'next/link';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';

const iconStyles = { fontSize: '1.5rem' };

const menuOptions = [
 {
  type: 'services',
  icon: <EngineeringOutlinedIcon sx={iconStyles} />,
  title: 'خدمــــــات',
  hasSubGategories: true,
  href: '/co-services',
 },
 {
  type: 'projects',
  icon: <EngineeringOutlinedIcon sx={iconStyles} />,
  title: 'پروژه‌هـــا',
  hasSubGategories: false,
  href: '/projects',
 },
 {
  type: 'articles',
  icon: <NewspaperOutlinedIcon sx={iconStyles} />,
  title: 'اخبار و مقالــــه‌ها',
  hasSubGategories: false,
  href: '/articles',
 },
 {
  type: 'contact',
  icon: <SupportAgentOutlinedIcon sx={iconStyles} />,
  title: 'تماس با مـــــا',
  hasSubGategories: false,
  href: '/contact-us',
 },
 {
  type: 'aboutUs',
  icon: <SupportAgentOutlinedIcon sx={iconStyles} />,
  title: 'تماس با مـــــا',
  hasSubGategories: false,
  href: '/about-us',
 },
];

export default function MobileMenu() {
 const { navigation } = useWebsiteDictionary() as {
  navigation: Dic;
 };

 return (
  <section className='p-4'>
   <nav>
    <ul>
     {menuOptions.map((menu) => (
      <li key={menu.title}>
       <Link
        href={menu.href}
        className='flex justify-between py-4 ps-4 border-b border-neutral-300 dark:border-neutral-600'
       >
        <div className='font-medium text-base flex items-center gap-2'>
         {menu.icon}
         <span>{navigation[menu.type] as string}</span>
        </div>
        <div className='text-neutral-500'>
         <ArrowLeftIcon />
        </div>
       </Link>
      </li>
     ))}
    </ul>
   </nav>
  </section>
 );
}
