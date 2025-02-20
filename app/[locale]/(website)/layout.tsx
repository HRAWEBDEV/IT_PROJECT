import { PropsWithChildren } from 'react';
import NavigationProvider from './services/NavigationProvider';

export default function layout({ children }: PropsWithChildren) {
 return (
  <>
   <NavigationProvider>{children}</NavigationProvider>
  </>
 );
}
