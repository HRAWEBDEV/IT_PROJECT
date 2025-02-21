import Header from './components/header/Header';
import Main from './components/Main';
import Hero from './components/Hero/Hero';
import Services from './components/services/Services';
import MobileBottomNav from './components/navigation/MobileBottomNav';

export default function page() {
 return (
  <div id='home-page'>
   <Header />
   <Main>
    <Hero />
    <Services />
   </Main>
   <MobileBottomNav />
  </div>
 );
}
