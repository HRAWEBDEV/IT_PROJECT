import { PropsWithChildren } from 'react';
import Header from './components/Header';
import Nav from './components/nav/nav';
import { getDictionary } from '@/localization/getDic';
import WebsiteDictionaryProvider from '@/services/dictionary/DictionaryProvider';
import { type AppParams } from '@/utils/appParams';

export default async function layout({
 children,
 params,
}: PropsWithChildren<{
 params: Promise<AppParams>;
}>) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'dashboard',
 });
 return (
  <WebsiteDictionaryProvider dic={dic}>
   <div className='flex flex-col overflow-hidden h-[100vh]'>
    <Header />
    <div className='flex flex-grow'>
     <Nav />
     {children}
    </div>
   </div>
  </WebsiteDictionaryProvider>
 );
}
