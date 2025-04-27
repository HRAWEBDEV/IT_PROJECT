import Hero from './components/Hero';
import ContactUs from './components/ContactUs';
import Footer from '../components/footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | درباره ما',
};

export default function page() {
 return (
  <div>
   <Hero />
   <ContactUs />
   <Footer />
  </div>
 );
}
