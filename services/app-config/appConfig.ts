import { type SupportedLocales, locales } from '../../localization/locales';
import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

type Config = {
 mode: 'light' | 'dark';
 locale: SupportedLocales;
 localeInfo: (typeof locales)[keyof typeof locales];
};

type ConfigAction = {
 changeMode: (mode: Config['mode']) => void;
 changeLocale: (locale: Config['locale']) => void;
};

const appConfigContext = createContext<(Config & ConfigAction) | null>(null);

function useAppConfig(): Config & ConfigAction {
 const value = use(appConfigContext);
 if (!value) throw new OutOfContext();
 return value;
}

export { type Config, type ConfigAction, appConfigContext, useAppConfig };
