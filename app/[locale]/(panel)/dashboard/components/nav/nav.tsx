'use client';
import React from 'react';
import NavList from './NavList';
import { addClass } from '@/utils/addClass';
import { useAppConfig } from '@/services/app-config/appConfig';
import { navigationList } from '../../utils/navgationList';
import { useNavigationContext } from '@/app/[locale]/(website)/services/NavigationContext';

export default function Nav() {
 const { localeInfo } = useAppConfig();
 const { navIsVisible } = useNavigationContext();
 return (
  <nav
   className={`fixed bg-background z-[1000] h-[calc(100vh-var(--dashboard-header-height))] lg:h-auto ${
    localeInfo.dir === 'rtl'
     ? 'translate-x-[--dashboard-nav-width]'
     : '-translate-x-[--dashboard-nav-width]'
   } lg:!translate-x-0 ${addClass(
    navIsVisible,
    '!translate-x-0'
   )}  lg:sticky transition-transform w-[--dashboard-nav-width] border-e border-neutral-300 dark:border-neutral-700 py-4 overflow-auto`}
  >
   <NavList navigationList={navigationList} />
  </nav>
 );
}
