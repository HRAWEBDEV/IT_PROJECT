import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Projects from './components/projects/Projects';

export default function page() {
 return (
  <div id='home-page'>
   <Hero />
   <Services />
   <Projects />
  </div>
 );
}
