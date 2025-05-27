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
import { type Dic, type WithDictionary } from '@/localization/locales';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav({ dic }: WithDictionary) {
 const { mobileBottomNavIsVisible } = useNavigationContext();
 const [activeTab, setActiveTab] = useState('');
 const pathname = usePathname();

 useEffect(() => {
  const activeMenu = pathname.split('/')[2];
  console.log(activeMenu);

  switch (activeMenu) {
   case undefined:
    setActiveTab('home');
    break;
   case 'menu':
    setActiveTab('menu');
    break;
   case 'co-services':
    setActiveTab('co-services');
    break;
   case 'articles':
    setActiveTab('articles');
    break;
   case 'about-us':
    setActiveTab('about-us');
    break;
  }
 }, [pathname]);

 return (
  <nav
   className={`lg:hidden fixed backdrop-blur-sm h-[--mobile-bottom-nav-height] bottom-0 start-0 end-0 z-[--mobile-bottom-nav-zindex] bg-neutral-100/80 dark:bg-neutral-900/80 shadow-[0px_0px_10px_3px] shadow-neutral-400/60 dark:shadow-neutral-700/60 ${addClass(
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
      label={(dic.navigation as Dic).home as string}
     />
     <Tab
      LinkComponent={Link}
      href='/menu'
      value='menu'
      icon={<DashboardCustomizeOutlinedIcon fontSize='small' />}
      label={(dic.navigation as Dic).menu as string}
     />
     <Tab
      LinkComponent={Link}
      href='/co-services'
      value='co-services'
      icon={<EngineeringOutlinedIcon fontSize='small' />}
      label={(dic.navigation as Dic).services as string}
     />
     <Tab
      LinkComponent={Link}
      href='/articles'
      value='articles'
      icon={<NewspaperOutlinedIcon fontSize='small' />}
      label={(dic.navigation as Dic).articles as string}
     />
     <Tab
      LinkComponent={Link}
      href='/about-us'
      value='about-us'
      icon={<SupportAgentOutlinedIcon fontSize='small' />}
      label={(dic.navigation as Dic).contact as string}
     />
    </Tabs>
   </div>
  </nav>
 );
}
