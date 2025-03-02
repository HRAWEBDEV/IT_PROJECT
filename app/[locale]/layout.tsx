import type { Metadata } from 'next';
import LocalFont from 'next/font/local';
import AppConfigProvider from '@/services/app-config/AppConfigProvider';
import AppMonitorProvider from '@/services/app-monitor/AppMonitorProvider';
import MuiCache from '@/components/mui/MuiCache';
import MuiTheme from '@/components/mui/MuiTheme';
import Script from 'next/script';
import MuiLocalization from '@/components/mui/MuiLocalization';
import { AppParams } from '@/utils/appParams';
import { locales } from '@/localization/locales';
import '../globals.css';

const irs = LocalFont({
 variable: '--irs-font',
 src: [
  {
   path: '../../public/fonts/fa/irs/irs-ultraLight.woff2',
   weight: '200',
   style: 'normal',
  },
  {
   path: '../../public/fonts/fa/irs/irs-light.woff2',
   weight: '300',
   style: 'normal',
  },
  {
   path: '../../public/fonts/fa/irs/irs.woff2',
   weight: '400',
   style: 'normal',
  },
  {
   path: '../../public/fonts/fa/irs/irs-medium.woff2',
   weight: '500',
   style: 'normal',
  },
  {
   path: '../../public/fonts/fa/irs/irs-bold.woff2',
   weight: '700',
   style: 'normal',
  },
  {
   path: '../../public/fonts/fa/irs/irs-black.woff2',
   weight: '900',
   style: 'normal',
  },
 ],
});

export const metadata: Metadata = {
 title: 'IT PROJECT',
 description: 'IT PROJECT',
};

export default async function RootLayout({
 children,
 params,
}: Readonly<{
 children: React.ReactNode;
 params: Promise<AppParams>;
}>) {
 const { locale } = await params;
 const localeInfo = locales[locale];

 return (
  <html lang={locale} dir={localeInfo.dir} className={`${irs.variable}`}>
   <Script id='change-mode'>
    {`
        const mode = localStorage.getItem("app-mode");
        document.documentElement.setAttribute('data-app-mode', mode);
        document.body.setAttribute('data-app-mode', mode);
    `}
   </Script>
   <body
    data-lang={locale}
    className='data-[lang="fa"]:font-irs font-normal text-sm data-[lang="fa"]:text-start text-foreground bg-background antialiased'
   >
    <AppConfigProvider>
     <MuiCache>
      <MuiTheme>
       <MuiLocalization>
        <AppMonitorProvider>{children}</AppMonitorProvider>
       </MuiLocalization>
      </MuiTheme>
     </MuiCache>
    </AppConfigProvider>
   </body>
  </html>
 );
}
