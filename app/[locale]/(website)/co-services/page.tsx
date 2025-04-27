import Services from './components/Services';
import Footer from '../components/footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | خدمات',
};

export default function page() {
 return (
  <div>
   <Services />
   <Footer />
  </div>
 );
}
