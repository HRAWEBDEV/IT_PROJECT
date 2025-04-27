'use client';
import { useState, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { type Config, appConfigContext } from './appConfig';
import { useParams } from 'next/navigation';
import { locales, SupportedLocales } from '@/localization/locales';
import {
 getMode as getStorageMode,
 setMode as setStorageMode,
 setLocale as setStorageLocale,
} from './appConfigStorage';
import { setCookie } from '@/utils/manageCookies';

export default function AppConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const { locale: localeParam } = useParams();
 const [mode, setMode] = useState<Config['mode']>('light');
 const localeInfo = locales[localeParam as SupportedLocales];

 const changeLocale = useCallback(
  (locale: Config['locale']) => {
   setStorageLocale(locale);
   setCookie({
    name: 'locale',
    value: locale,
    expireDays: 365,
   });
   const currentHref = window.location.href;
   const newHref = currentHref.replace(localeParam as string, locale);
   window.location.href = newHref;
  },
  [localeParam]
 );

 const changeMode = useCallback((mode: Config['mode']) => {
  setMode(mode);
  setStorageMode(mode);
 }, []);

 const ctxValue = useMemo(
  () => ({
   mode,
   locale: localeParam as SupportedLocales,
   localeInfo,
   changeLocale,
   changeMode,
  }),
  [localeParam, mode, localeInfo, changeLocale, changeMode]
 );

 useEffect(() => {
  document.documentElement.setAttribute('data-app-mode', mode);
  document.body.setAttribute('data-app-mode', mode);
 }, [mode]);
 useEffect(() => {
  setMode(getStorageMode() || 'light');
 }, []);
 return (
  <appConfigContext.Provider value={ctxValue}>
   {children}
  </appConfigContext.Provider>
 );
}
