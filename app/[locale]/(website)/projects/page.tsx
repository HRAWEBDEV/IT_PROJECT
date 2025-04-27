import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import Hero from './components/Hero';
import Projects from './components/projects/Projects';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | پروژه‌ها',
};

export default function page() {
 return (
  <div>
   <Hero />
   <Projects />
   <Footer />
  </div>
 );
}
