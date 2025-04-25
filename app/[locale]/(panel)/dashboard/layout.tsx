import { PropsWithChildren } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import NavigatioProvider from './navigation/NavigatioProvider';

export default function layout({ children }: PropsWithChildren) {
 return (
  <div className='h-[100vh] bg-bgDashboard flex flex-col'>
   <NavigatioProvider>
    <Header />
    <Main>
     <Nav />
     {children}
    </Main>
   </NavigatioProvider>
  </div>
 );
}
