import { PropsWithChildren } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import NavigatioProvider from './navigation/NavigatioProvider';
import 'ckeditor5/ckeditor5.css';
import { Metadata } from 'next';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import WebsiteDictionaryProvider from '@/services/dictionary/DictionaryProvider';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | داشبورد',
};

export default async function layout({
 children,
 params,
}: PropsWithChildren & {
 params: Promise<AppParams>;
}) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'dashboard',
 });
 return (
  <div className='h-[100vh] bg-bgDashboard flex flex-col'>
   <WebsiteDictionaryProvider dic={dic}>
    <NavigatioProvider>
     <Header />
     <Main>
      <Nav />
      <div className='p-4 flex-grow'>{children}</div>
     </Main>
    </NavigatioProvider>
   </WebsiteDictionaryProvider>
  </div>
 );
}
