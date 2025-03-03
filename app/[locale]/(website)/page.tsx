import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Articles from './components/articles/Articles';
import Projects from './components/projects/Projects';

export default function page() {
 return (
  <div id='home-page'>
   <Hero />
   <Services />
   <Articles />
   <div className='h-[6rem]'></div>
   <Projects />
  </div>
 );
}
