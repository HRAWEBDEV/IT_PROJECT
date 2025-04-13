import { createContext, use } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { Dispatch, SetStateAction } from 'react';

type Props = {
 headerIsVisible: boolean;
 mobileBottomNavIsVisible: boolean;
 navIsVisible: boolean;
 setNavIsVisible: Dispatch<SetStateAction<boolean>>;
};

const navigationContext = createContext<Props | null>(null);

function useNavigationContext(): Props {
 const val = use(navigationContext);
 if (!val) throw new OutOfContext();
 return val;
}

export { type Props, navigationContext, useNavigationContext };
