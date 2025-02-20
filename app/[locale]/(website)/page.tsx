import Header from './components/header/Header';
import Main from './components/Main';
import { Hero } from './components/Hero/Hero';
import MobileBottomNav from './components/navigation/MobileBottomNav';

export default function page() {
 return (
  <div id='home-page'>
   <Header />
   <Main>
    <Hero />
   </Main>
   <MobileBottomNav />
  </div>
 );
}
