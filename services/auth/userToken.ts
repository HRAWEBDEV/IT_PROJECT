import { getCookie, setCookie } from '@/utils/manageCookies';

const authCookieName = 'auth';

function getAuthFromCookie(): string | null {
 const cookie = getCookie(authCookieName);
 if (!cookie) return null;
 return cookie as string;
}

function setAuthToCookie(value: string) {
 setCookie({
  name: authCookieName,
  value,
  expireDays: 30,
 });
}

function logout() {
 setCookie({
  name: authCookieName,
  value: '',
  expireDays: 0,
 });
}

export { authCookieName, getAuthFromCookie, setAuthToCookie, logout };
