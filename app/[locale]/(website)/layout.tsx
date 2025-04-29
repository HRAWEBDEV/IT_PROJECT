import { PropsWithChildren } from 'react';
import NavigationProvider from './services/NavigationProvider';
import Header from './components/header/Header';
import Main from './components/Main';
import MobileBottomNav from './components/navigation/MobileBottomNav';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';
import WebsiteDictionaryProvider from '@/services/dictionary/WebsiteDictionaryProvider';

export default async function layout({
 children,
 params,
}: PropsWithChildren<{
 params: Promise<AppParams>;
}>) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'layout',
 });

 return (
  <WebsiteDictionaryProvider dic={dic}>
   <NavigationProvider>
    <Header dic={dic} />
    <Main>{children}</Main>
    <MobileBottomNav dic={dic} />
   </NavigationProvider>
  </WebsiteDictionaryProvider>
 );
}
