import { PropsWithChildren } from 'react';
import NavigationProvider from './services/NavigationProvider';
import Header from './components/header/Header';
import Main from './components/Main';
import MobileBottomNav from './components/navigation/MobileBottomNav';

export default function layout({ children }: PropsWithChildren) {
 return (
  <>
   <NavigationProvider>
    <Header />
    <Main>{children}</Main>
    <MobileBottomNav />
   </NavigationProvider>
   {/* <Footer /> */}
  </>
 );
}
