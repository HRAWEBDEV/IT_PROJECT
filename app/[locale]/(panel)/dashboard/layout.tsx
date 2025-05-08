import { PropsWithChildren } from 'react';
import Header from './components/Header';
import Nav from './components/nav/nav';
import { getDictionary } from '@/localization/getDic';
import WebsiteDictionaryProvider from '@/services/dictionary/DictionaryProvider';
import { type AppParams } from '@/utils/appParams';
import Main from './components/nav/Main';
import NavigationProvider from '../../(website)/services/NavigationProvider';
import 'ckeditor5/ckeditor5.css';

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
   <NavigationProvider>
    <div className='flex flex-col overflow-hidden h-[100vh]'>
     <Header />
     <div className='flex flex-grow overflow-hidden'>
      <Nav />
      <Main>{children}</Main>
     </div>
    </div>
   </NavigationProvider>
  </WebsiteDictionaryProvider>
 );
}
