import { PropsWithChildren } from 'react';
import Banner from './components/Banner';
import Footer from '../../components/footer/Footer';
import { AppParams } from '@/utils/appParams';

export default function layout({
 children,
 params,
}: PropsWithChildren<{ params: Promise<AppParams> }>) {
 return (
  <div>
   <Banner />
   {children}
   <Footer params={params} />
  </div>
 );
}
