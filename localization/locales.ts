type Dic = {
 [key: string]: string | Dic;
};

type WithDictionary = {
 dic: Dic;
};

const locales = {
 fa: {
  id: 1,
  dir: 'rtl',
  langAlias: 'fa',
  lang: 'persian',
  calendar: 'jalali',
  extension: 'IR',
  short: 'فا',
  long: 'فارسی',
 },
 en: {
  id: 2,
  dir: 'ltr',
  langAlias: 'en',
  lang: 'english',
  calendar: 'gregorian',
  extension: 'US',
  short: 'en',
  long: 'english',
 },
} as const;

type SupportedLocales = keyof typeof locales;

export { type Dic, type WithDictionary, type SupportedLocales, locales };
