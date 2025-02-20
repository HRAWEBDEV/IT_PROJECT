import type { Config } from 'tailwindcss';

export default {
 content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
 ],
 theme: {
  extend: {
   container: {
    center: true,
    padding: {
     DEFAULT: '1rem',
     lg: '2rem',
    },
    screens: {
     '2xl': '1400px',
    },
   },
   fontFamily: {
    irs: 'var(--irs-font)',
   },
   colors: {
    background: 'var(--background)',
    foreground: 'var(--foreground)',
    primary: {
     DEFAULT: 'hsl(var(--primary))',
     foreground: 'hsl(var(--primary-foreground))',
     light: 'hsl(var(--primary-light))',
     dark: 'hsl(var(--primary-dark))',
    },
    secondary: {
     DEFAULT: 'hsl(var(--secondary))',
     foreground: 'hsl(var(--secondary-foreground))',
     light: 'hsl(var(--accent-light))',
     dark: 'hsl(var(--accent-dark))',
    },
   },
  },
 },
 plugins: [],
} satisfies Config;
