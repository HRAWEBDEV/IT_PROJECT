import { PropsWithChildren } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import NavigatioProvider from './navigation/NavigatioProvider';
import 'ckeditor5/ckeditor5.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | داشبورد',
};

export default function layout({ children }: PropsWithChildren) {
 return (
  <div className='h-[100vh] bg-bgDashboard flex flex-col'>
   <NavigatioProvider>
    <Header />
    <Main>
     <Nav />
     <div className='p-4 flex-grow'>{children}</div>
    </Main>
   </NavigatioProvider>
  </div>
 );
}
