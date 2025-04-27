import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Articles from './components/articles/Articles';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | اخبار و مقاله‌ها',
};

export default function page() {
 return (
  <div>
   <Hero />
   <Articles />
   <Footer />
  </div>
 );
}
