import { NextRequest, NextResponse } from 'next/server';
import { locales } from './localization/locales';
import {
 type UserInfo,
 getUserInfoApi,
} from './services/api-actions/authApiActionts';
import { ResponseShape } from './services/api-actions/globalApiActions';

async function middleware(request: NextRequest) {
 const pathWithSearch = `${request.nextUrl.pathname}${request.nextUrl.search}`;
 const pathSegments = request.nextUrl.pathname.split('/');
 if (request.nextUrl.pathname.includes('.')) return;
 if (pathSegments[1] == 'api') return;
 // * localizing app
 const matchedLocale = Object.keys(locales).find(
  (locale) => locale == pathSegments[1]
 );
 const defaultLocale = 'fa';
 const userLocale = request.cookies.get('locale')?.value || defaultLocale;
 const userToken = request.cookies.get('auth')?.value;
 const lockedRoutes = ['dashboard', 'profile'];

 if (lockedRoutes.includes(pathSegments[2]) && !userToken) {
  return NextResponse.redirect(new URL(`/${userLocale}/`, request.url));
 }
 // TODO after production fix this
 // if (pathSegments[2] === 'dashboard') {
 //  try {
 //   const userInfo = await fetch(
 //    `${process.env.NEXT_PUBLIC_API_BASE_URL}${getUserInfoApi}`,
 //    {
 //     headers: {
 //      Authorization: `Bearer ${userToken}`,
 //     },
 //    }
 //   );
 //   if (userInfo.ok) {
 //    const userInfoData = (await userInfo.json()) as ResponseShape<UserInfo>;
 //    if (!userInfoData.payload.HasDashboard) {
 //     return NextResponse.redirect(new URL(`/${userLocale}/`, request.url));
 //    }
 //   }
 //  } catch {
 //   return NextResponse.redirect(new URL(`/${userLocale}/`, request.url));
 //  }
 // }
 if (!matchedLocale) {
  return NextResponse.redirect(
   new URL(`/${userLocale}/${pathWithSearch}`, request.url)
  );
 }
}

const config = {
 matcher: ['/((?!_next).*)'],
};

export { middleware, config };
