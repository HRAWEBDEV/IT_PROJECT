import { PropsWithChildren } from 'react';
import Banner from './components/Banner';
import Footer from '../../components/footer/Footer';

export default function layout({ children }: PropsWithChildren) {
 return (
  <div>
   <Banner />
   {children}
   <Footer />
  </div>
 );
}
