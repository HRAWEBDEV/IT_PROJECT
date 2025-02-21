'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { useNavigationContext } from '../../services/NavigationContext';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import { addClass } from '@/utils/addClass';
// import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
 const { mobileBottomNavIsVisible } = useNavigationContext();
 const [activeTab, setActiveTab] = useState('home');
 const pathname = usePathname();

 useEffect(() => {
  const activeMenu = pathname.split('/')[2];
  switch (activeMenu) {
   case undefined:
    setActiveTab('home');
    break;
   case 'menu':
    setActiveTab('menu');
    break;
   case 'services':
    setActiveTab('services');
    break;
   case 'news':
    setActiveTab('news');
    break;
   case 'support':
    setActiveTab('support');
    break;
  }
 }, [pathname]);

 return (
  <nav
   className={`fixed h-[--mobile-bottom-nav-height] bottom-0 start-0 end-0 z-[--mobile-bottom-nav-zindex] bg-neutral-100 dark:bg-neutral-900 shadow-[0px_0px_10px_3px] shadow-neutral-400/60 dark:shadow-neutral-700/60 ${addClass(
    !mobileBottomNavIsVisible,
    'translate-y-[--mobile-bottom-nav-height]'
   )} transition-transform`}
  >
   <div className='h-full'>
    <Tabs
     value={activeTab}
     onChange={(_, newValue) => setActiveTab(newValue)}
     centered
     sx={{
      '& .MuiTabs-flexContainer': {
       width: '100%',
       height: 'var(--mobile-bottom-height)',
      },
      '& .MuiButtonBase-root': {
       flexGrow: 1,
       flexBasis: 0,
       padding: '0.61rem 0',
       fontSize: '0.75rem',
       fontWeight: 500,
       minHeight: 'unset',
       minWidth: 'unset',
      },
      '& svg': {
       transition: 'transform 0.2s ease',
      },
      '& .MuiButtonBase-root[aria-selected="true"] svg': {
       transform: 'scale(1.4)',
      },
     }}
    >
     <Tab
      LinkComponent={Link}
      href='/'
      value='home'
      icon={<RoofingOutlinedIcon fontSize='small' />}
      label='خانه'
     />
     <Tab
      LinkComponent={Link}
      href='/menu'
      value='menu'
      icon={<DashboardCustomizeOutlinedIcon fontSize='small' />}
      label='منو'
     />
     <Tab
      disabled
      value='services'
      icon={<EngineeringOutlinedIcon fontSize='small' />}
      label='خدمات'
     />
     <Tab
      disabled
      value='news'
      icon={<NewspaperOutlinedIcon fontSize='small' />}
      label='اخبار و مقالات'
     />
     <Tab
      disabled
      value='support'
      icon={<SupportAgentOutlinedIcon fontSize='small' />}
      label='تماس با ما'
     />
    </Tabs>
   </div>
  </nav>
 );
}
