'use client';
import { PropsWithChildren } from 'react';
import ProfileMenu from './ProfileMenu';

export default function ProfileLayout({ children }: PropsWithChildren) {
 return (
  <div className='container grid gap-4 grid-cols-[16rem_1fr]'>
   <ProfileMenu />
   <div className='overflow-hidden'>{children}</div>
  </div>
 );
}
