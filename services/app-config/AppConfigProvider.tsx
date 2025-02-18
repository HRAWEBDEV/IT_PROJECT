'use client';
import { useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { type Config, appConfigContext } from './appConfig';
import { useParams } from 'next/navigation';
import { locales } from '@/localization/locales';
import {
 getMode as getStorageMode,
 setMode as setStorageMode,
} from './appConfigStorage';

export default function AppConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const { locale: localeParam } = useParams();
 const [mode, setMode] = useState<Config['mode']>(() => {
  try {
   const mode = getStorageMode();
   document.documentElement.setAttribute('data-app-mode', mode);
   document.body.setAttribute('data-app-mode', mode);
   return mode;
  } catch {
   return 'light';
  }
 });
 const [locale, setLocale] = useState<Config['locale']>(() => {
  return localeParam as Config['locale'];
 });
 const localeInfo = locales[locale];

 const changeLocale = useCallback((locale: Config['locale']) => {
  setLocale(locale);
 }, []);

 const changeMode = useCallback((mode: Config['mode']) => {
  setMode(mode);
  setStorageMode(mode);
 }, []);

 const ctxValue = useMemo(
  () => ({
   mode,
   locale,
   localeInfo,
   changeLocale,
   changeMode,
  }),
  [locale, mode, localeInfo, changeLocale, changeMode]
 );

 useEffect(() => {
  document.documentElement.setAttribute('data-app-mode', mode);
  document.body.setAttribute('data-app-mode', mode);
 }, [mode]);
 return (
  <appConfigContext.Provider value={ctxValue}>
   {children}
  </appConfigContext.Provider>
 );
}
