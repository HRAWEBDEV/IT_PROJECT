import type { Config } from 'tailwindcss';

export default {
 darkMode: ['class', '[data-app-mode="dark"]'],
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
     '2xl': '1300px',
    },
   },
   fontFamily: {
    irs: 'var(--irs-font)',
   },
   colors: {
    background: 'hsl(var(--background))',
    bgDashboard: 'hsl(var(--bg-dashboard))',
    foreground: 'hsl(var(--foreground))',
    primary: {
     DEFAULT: 'hsl(var(--primary))',
     foreground: 'hsl(var(--primary-foreground))',
     light: 'hsl(var(--primary-light))',
     dark: 'hsl(var(--primary-dark))',
    },
    secondary: {
     DEFAULT: 'hsl(var(--secondary))',
     foreground: 'hsl(var(--secondary-foreground))',
     light: 'hsl(var(--secondary-light))',
     dark: 'hsl(var(--secondary-dark))',
    },
   },
  },
 },
 plugins: [],
} satisfies Config;
