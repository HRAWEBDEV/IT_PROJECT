'use client';
import { useState } from 'react';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { useNavigationContext } from '../../services/NavigationContext';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { addClass } from '@/utils/addClass';
// import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function MobileBottomNav() {
 const { mobileBottomNavIsVisible } = useNavigationContext();
 const [activeTab, setActiveTab] = useState('home');

 return (
  <nav
   className={`fixed h-[--mobile-bottom-nav-height] bottom-0 start-0 end-0 z-[--mobile-bottom-nav-zindex] bg-neutral-100 ${addClass(
    !mobileBottomNavIsVisible,
    'translate-y-[--mobile-bottom-nav-height]'
   )} transition-transform`}
  >
   <div className='h-full shadow-[0px_0px_10px_3px] shadow-neutral-400/60'>
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
      value='home'
      icon={<RoofingOutlinedIcon fontSize='small' />}
      label='خانه'
     />
     <Tab
      value='menu'
      icon={<DashboardCustomizeOutlinedIcon fontSize='small' />}
      label='منو'
     />
     <Tab
      value='profile'
      icon={<AccountCircleOutlinedIcon fontSize='small' />}
      label='پروفایل'
     />
     <Tab
      value='search'
      icon={<SearchOutlinedIcon fontSize='small' />}
      label='جستجو'
     />
     <Tab
      value='support'
      icon={<SupportAgentOutlinedIcon fontSize='small' />}
      label='تماس با ما'
     />
    </Tabs>
   </div>
  </nav>
 );
}
