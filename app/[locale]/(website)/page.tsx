import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Articles from './components/articles/Articles';
import Projects from './components/projects/Projects';
import Footer from './components/footer/Footer';

export default function page() {
 return (
  <div id='home-page'>
   <Hero />
   <Services />
   <Projects />
   <Articles />
   <Footer />
  </div>
 );
}
