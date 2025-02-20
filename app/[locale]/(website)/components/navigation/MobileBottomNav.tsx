'use client';
import { useState } from 'react';
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
// import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function MobileBottomNav() {
 const [activeTab, setActiveTab] = useState('home');
 return (
  <nav className='fixed bottom-0 start-0 end-0 z-[--mobile-bottom-nav-zindex] bg-neutral-200 lg:hidden'>
   <div className='shadow-[0px_0px_10px_3px] shadow-neutral-400/60'>
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
       padding: '0.5rem',
       fontSize: '0.75rem',
       fontWeight: 500,
       minHeight: 'unset',
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
