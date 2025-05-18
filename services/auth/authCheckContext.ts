import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type UserInfo } from '../api-actions/authApiActionts';

type Store = {
 userInfo: UserInfo | null;
 isFetchingUser: boolean;
 refreshUserInfo: () => void;
};

const authCheckContext = createContext<Store | null>({
 userInfo: null,
 isFetchingUser: false,
 refreshUserInfo: () => {},
});

function useAuthCheck() {
 const authCheck = use(authCheckContext);
 if (!authCheck) throw new OutOfContext();
 return authCheck;
}

export { type Store, useAuthCheck, authCheckContext };
