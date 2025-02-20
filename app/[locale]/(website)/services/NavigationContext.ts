import { createContext, use } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

type Props = {
 headerIsVisible: boolean;
 mobileBottomNavIsVisible: boolean;
};

const navigationContext = createContext<Props | null>(null);

function useNavigationContext(): Props {
 const val = use(navigationContext);
 if (!val) throw new OutOfContext();
 return val;
}

export { type Props, navigationContext, useNavigationContext };
