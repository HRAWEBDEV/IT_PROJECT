import type { Metadata } from 'next';
import LocalFont from 'next/font/local';
import { getDictionary } from '@/localization/getDic';
import AppConfigProvider from '@/services/app-config/AppConfigProvider';
import AppMonitorProvider from '@/services/app-monitor/AppMonitorProvider';
import MuiCache from '@/components/mui/MuiCache';
import MuiTheme from '@/components/mui/MuiTheme';
import MuiLocalization from '@/components/mui/MuiLocalization';
import { AppParams } from '@/utils/appParams';
import { locales } from '@/localization/locales';
import ReactQueryProvider from '@/services/react-query/ReactQueryProvider';
import AxiosInterceptor from '@/services/axios/AxiosInterceptor';
import '../globals.css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

export async function generateMetadata({
 params,
}: {
 params: Promise<AppParams>;
}): Promise<Metadata> {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'meta',
 });
 return dic;
}

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
   <body
    data-lang={locale}
    className='data-[lang="fa"]:font-irs font-normal text-sm data-[lang="fa"]:text-start text-foreground bg-background antialiased'
   >
    <AppConfigProvider>
     <MuiCache>
      <MuiTheme>
       <MuiLocalization>
        <AppMonitorProvider>
         <ReactQueryProvider>
          <AxiosInterceptor />
          {children}
         </ReactQueryProvider>
        </AppMonitorProvider>
       </MuiLocalization>
      </MuiTheme>
     </MuiCache>
    </AppConfigProvider>
   </body>
  </html>
 );
}
