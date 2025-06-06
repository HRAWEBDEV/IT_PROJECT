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
import ToastrProvider from '@/services/notifications/ToastrProvider';
import AuthProvider from '@/services/auth/AuthProvider';
import AuthCheck from '@/services/auth/AuthCheck';
import '../globals.css';
import '../icons.css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'ckeditor5/ckeditor5.css';

const enRoboto = LocalFont({
 variable: '--en-roboto',
 src: '../../public/fonts/en/roboto/Roboto-VariableFont_wdth,wght.ttf',
 display: 'swap',
});

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
 return {
  ...dic,
  openGraph: {
   title: dic.title as string,
   description: dic.description as string,
   locale: locale,
   images: [
    {
     url: '/favs/icon512_maskable.png',
    },
   ],
  },
  twitter: {
   title: dic.title as string,
   description: dic.description as string,
   images: [
    {
     url: '/favs/icon512_maskable.png',
    },
   ],
  },
 };
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
  <html
   lang={locale}
   dir={localeInfo?.dir || 'rtl'}
   className={`${irs.variable} ${enRoboto.variable}`}
  >
   <body
    data-lang={locale}
    className='font-enRoboto data-[lang="fa"]:font-irs font-normal text-sm text-start text-foreground bg-background antialiased'
   >
    <AppConfigProvider>
     <MuiCache>
      <MuiTheme>
       <MuiLocalization>
        <AppMonitorProvider>
         <ReactQueryProvider>
          <AuthProvider>
           <AxiosInterceptor />
           <AuthCheck>
            <ToastrProvider>{children}</ToastrProvider>
           </AuthCheck>
          </AuthProvider>
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
