'use client';
import { PropsWithChildren } from 'react';
import NavigationBackDrop from './NavigationBackDrop';

export default function Main({ children }: PropsWithChildren) {
 return (
  <div className='flex-grow flex overflow-hidden'>
   <NavigationBackDrop />
   {children}
  </div>
 );
}
