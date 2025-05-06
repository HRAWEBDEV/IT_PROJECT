'use client';
import React from 'react';
import NavList from './NavList';
import { navigationList } from '../../utils/navgationList';

export default function nav() {
 return (
  <nav className='w-[--dashboard-nav-width] border-l border-neutral-300 dark:border-neutral-700 py-4'>
   <NavList navigationList={navigationList} />
  </nav>
 );
}
