import { PropsWithChildren } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';

export default function layout({ children }: PropsWithChildren) {
 return (
  <div className='h-[100vh] bg-bgDashboard flex flex-col'>
   <Header />
   <Main>
    <Nav />
    {children}
   </Main>
  </div>
 );
}
