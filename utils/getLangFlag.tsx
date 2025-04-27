import { type SupportedLocales } from '@/localization/locales';
import { type Props } from './iconProps';
import IranFlag from '@/components/icons/IranFlag';
import UKFlag from '@/components/icons/UKFlag';

export const getLangFlag = (locale: SupportedLocales, styles: Props) => {
 switch (locale) {
  case 'fa':
   return <IranFlag {...styles} />;
  case 'en':
   return <UKFlag {...styles} />;
  default:
   return <IranFlag {...styles} />;
 }
};
