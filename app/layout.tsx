import type { Metadata } from 'next';
import LocalFont from 'next/font/local';
import './globals.css';

const irs = LocalFont({
 variable: '--irs-font',
 src: [
  {
   path: '../public/fonts/fa/irs/irs-ultraLight.woff2',
   weight: '200',
   style: 'normal',
  },
  {
   path: '../public/fonts/fa/irs/irs-light.woff2',
   weight: '300',
   style: 'normal',
  },
  {
   path: '../public/fonts/fa/irs/irs.woff2',
   weight: '400',
   style: 'normal',
  },
  {
   path: '../public/fonts/fa/irs/irs-medium.woff2',
   weight: '500',
   style: 'normal',
  },
  {
   path: '../public/fonts/fa/irs/irs-bold.woff2',
   weight: '700',
   style: 'normal',
  },
  {
   path: '../public/fonts/fa/irs/irs-black.woff2',
   weight: '900',
   style: 'normal',
  },
 ],
});

export const metadata: Metadata = {
 title: 'IT PROJECT',
 description: 'IT PROJECT',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang='en' className={`${irs.className}`}>
   <body className='antialiased'>{children}</body>
  </html>
 );
}
