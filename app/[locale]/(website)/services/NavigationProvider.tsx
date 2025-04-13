'use client';
import { PropsWithChildren, useState, useMemo, useEffect } from 'react';
import { navigationContext } from './NavigationContext';

export default function NavigationProvider({ children }: PropsWithChildren) {
 const [headerIsVisible, setHeaderIsVisible] = useState(true);
 const [navIsVisible, setNavIsVisible] = useState(false);
 const [mobileBottomNavIsVisible, setMobileBottomNavIsVisible] = useState(true);

 const ctx = useMemo(
  () => ({
   headerIsVisible,
   navIsVisible,
   setNavIsVisible,
   mobileBottomNavIsVisible,
  }),
  [headerIsVisible, mobileBottomNavIsVisible, navIsVisible]
 );

 useEffect(() => {
  let scrollPosition = 0;
  const limit = 100;
  const windowScrollWatcher = () => {
   const bodyTopPosition = document.body.getBoundingClientRect().top;
   const scrollDirection = scrollPosition <= bodyTopPosition ? 'up' : 'down';
   const scrollChange = Math.abs(
    Math.abs(scrollPosition) - Math.abs(bodyTopPosition)
   );
   if (scrollChange >= limit) {
    scrollPosition = bodyTopPosition;
    setHeaderIsVisible(scrollDirection == 'up' ? true : false);
    setMobileBottomNavIsVisible(scrollDirection == 'up' ? true : false);
   }
  };
  window.addEventListener('scroll', windowScrollWatcher);
  return () => window.removeEventListener('scroll', windowScrollWatcher);
 }, []);

 return (
  <navigationContext.Provider value={ctx}>
   {children}
  </navigationContext.Provider>
 );
}
