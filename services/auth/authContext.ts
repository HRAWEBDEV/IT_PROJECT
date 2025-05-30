import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { getAuthFromCookie, setAuthToCookie, logout } from './userToken';
//

type Store = {
 isLogedIn: boolean;
 firstSet: boolean;
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
