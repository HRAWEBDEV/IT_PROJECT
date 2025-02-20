import colors from 'tailwindcss/colors';
import { type DefaultColors } from 'tailwindcss/types/generated/colors';
import {} from '@mui/material/styles';

declare module '@mui/material/styles' {
 interface Palette
  extends Omit<
   DefaultColors,
   'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'
  > {
  contrastThreshold: number;
 }
 interface PaletteOptions
  extends Omit<
   DefaultColors,
   'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'
  > {
  divider?: string;
 }
}

export const pallete = {
 primary: {
  light: 'var(--primary-light)',
  main: 'var(--primary)',
  dark: 'var(--primary-dark)',
  contrastText: 'var(--primary-foreground)',
 },
 secondary: {
  light: 'var(--secondary-light)',
  main: 'var(--secondary)',
  dark: 'var(--secondary-dark)',
  contrastText: 'var(--secondary-foreground)',
 },
 text: {
  primary: 'var(--foreground)',
 },
 ...colors,
};
