import { PropsWithChildren } from 'react';
import AuthTabs from './components/AuthTabs';
import { Metadata } from 'next';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | احراز هویت',
};

export default async function layout({
 children,
 params,
}: PropsWithChildren & { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'auth',
 });
 return (
  <div className='h-[calc(100vh_-_var(--header-height)_-_var(--mobile-bottom-nav-height))] lg:h-[calc(100vh_-_var(--header-height))] overflow-hidden bg-neutral-200 dark:bg-neutral-800'>
   <div className='lg:py-8 lg:px-4 h-full overflow-hidden'>
    <div className='container h-full bg-background lg:rounded-xl grid lg:grid-cols-2 px-0 overflow-hidden'>
     <div className='overflow-auto'>
      <AuthTabs dic={dic} />
      {children}
     </div>
     <div className='border-s border-neutral-200 dark:border-neutral-800 place-content-center hidden lg:grid'>
      <img
       src='/images/login/login-1.png'
       alt='login-page-img'
       className='w-full dark:brightness-75'
      />
     </div>
    </div>
   </div>
  </div>
 );
}
