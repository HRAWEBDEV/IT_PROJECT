import Main from '../components/Main';
import Header from '../components/header/Header';
import MobileBottomNav from '../components/navigation/MobileBottomNav';
import MobileMenu from './components/MobileMenu';

export default function page() {
 return (
  <div id='home-page'>
   <Header />
   <Main>
    <MobileMenu />
   </Main>
   <MobileBottomNav />
  </div>
 );
}
