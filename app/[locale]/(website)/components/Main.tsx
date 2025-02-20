import { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren) {
 return (
  <main className='pt-[--header-height] pb-[--mobile-bottom-height]'>
   {children}
  </main>
 );
}
