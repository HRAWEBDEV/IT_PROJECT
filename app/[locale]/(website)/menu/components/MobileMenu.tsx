'use client';
import Link from 'next/link';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const iconStyles = { fontSize: '1.5rem' };

const menuOptions = [
 {
  icon: <EngineeringOutlinedIcon sx={iconStyles} />,
  title: 'خدمــــــات',
  hasSubGategories: true,
 },
 {
  icon: <EngineeringOutlinedIcon sx={iconStyles} />,
  title: 'پروژه‌هـــا',
  hasSubGategories: false,
 },
 {
  icon: <NewspaperOutlinedIcon sx={iconStyles} />,
  title: 'اخبار و مقـــالات',
  hasSubGategories: false,
 },
 {
  icon: <SupportAgentOutlinedIcon sx={iconStyles} />,
  title: 'ارتباط‌ بامـــا',
  hasSubGategories: false,
 },
];

export default function MobileMenu() {
 return (
  <section className='p-4'>
   <nav>
    <ul>
     {menuOptions.map((menu) => (
      <li key={menu.title}>
       <Link
        href={'#'}
        className='flex justify-between py-4 ps-4 border-b border-neutral-300 dark:border-neutral-600'
       >
        <div className='font-medium text-base flex items-center gap-2'>
         {menu.icon}
         <span>{menu.title}</span>
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
