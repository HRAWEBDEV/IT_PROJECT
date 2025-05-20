import { createContext, use } from 'react';
import { type RoleAccess } from '@/services/api-actions/authApiActionts';
import { OutOfContext } from '@/utils/OutOfContext';

type Store = {
 roleAccess: RoleAccess;
};

const accessContext = createContext<Store | null>(null);

const useAccessContext = () => {
 const context = use(accessContext);
 if (!context) {
  throw new OutOfContext();
 }
 return context;
};

export { useAccessContext, accessContext, type Store };
