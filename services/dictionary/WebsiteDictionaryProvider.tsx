'use client';
import { type WithDictionary } from '@/localization/locales';
import { type PropsWithChildren } from 'react';
import { websiteDictionaryContext } from './WebsiteDictionaryContext';

export default function WebsiteDictionaryProvider({
 dic,
 children,
}: PropsWithChildren & WithDictionary) {
 return (
  <websiteDictionaryContext.Provider value={dic}>
   {children}
  </websiteDictionaryContext.Provider>
 );
}
