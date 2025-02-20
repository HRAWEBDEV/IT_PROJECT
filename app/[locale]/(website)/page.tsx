import Header from './components/header/Header';
import Main from './components/Main';
import MobileBottomNav from './components/navigation/MobileBottomNav';

export default function page() {
 return (
  <div id='home-page'>
   <Header />
   <Main />
   <MobileBottomNav />
  </div>
 );
}
