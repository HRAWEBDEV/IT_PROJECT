import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import Articles from './components/articles/Articles';

export default function page() {
 return (
  <div id='home-page'>
   <Hero />
   <Services />
   <Articles />
  </div>
 );
}
