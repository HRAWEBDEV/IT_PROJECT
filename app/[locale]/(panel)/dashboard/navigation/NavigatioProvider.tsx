'use client';
import { PropsWithChildren, useState, useCallback, useMemo } from 'react';
import { navigationContext } from './navigationContext';

export default function NavigatioProvider({ children }: PropsWithChildren) {
 const [isNavigationVisible, setIsNavigationVisible] = useState(false);

 const handleToggleNavigation = useCallback(() => {
  setIsNavigationVisible((prev) => !prev);
 }, []);

 const ctx = useMemo(
  () => ({ isNavigationVisible, handleToggleNavigation }),
  [handleToggleNavigation, isNavigationVisible]
 );

 return (
  <navigationContext.Provider value={ctx}>
   {children}
  </navigationContext.Provider>
 );
}
