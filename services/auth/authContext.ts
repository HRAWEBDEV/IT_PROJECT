import { use, createContext } from 'react';
import { setCookie, getCookie } from '@/utils/manageCookies';
import { OutOfContext } from '@/utils/OutOfContext';

//
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
//

type Store = {
 isLogedIn: boolean;
 setAuthToken: (value: string) => void;
 getAuthToken: () => string | null;
 removeAuthToken: () => void;
};

const authContext = createContext<Store | null>(null);

function useAuth() {
 const auth = use(authContext);
 if (!auth) throw new OutOfContext();
 return auth;
}

export {
 type Store,
 useAuth,
 authContext,
 getAuthFromCookie,
 setAuthToCookie,
 logout,
};
