import { OutOfContext } from '@/utils/OutOfContext';
import { createContext, use } from 'react';

type Store = {
 isNavigationVisible: boolean;
 handleToggleNavigation: () => void;
};

const navigationContext = createContext<Store | null>(null);

function useNavigationContext() {
 const context = use(navigationContext);
 if (context === null) {
  throw new OutOfContext();
 }
 return context;
}

export { type Store, useNavigationContext, navigationContext };
