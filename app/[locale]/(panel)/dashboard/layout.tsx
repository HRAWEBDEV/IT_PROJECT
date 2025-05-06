import { PropsWithChildren } from 'react';
import Header from './components/Header';

export default function layout({ children }: PropsWithChildren) {
 return (
  <div>
   <Header />
   {children}
  </div>
 );
}
