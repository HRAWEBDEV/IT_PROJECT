import { OutOfContext } from '@/utils/OutOfContext';
import { useContext, createContext } from 'react';
import { type Dic } from '@/localization/locales';

const websiteDictionaryContext = createContext<Dic | null>(null);

const useWebsiteDictionary = () => {
 const dic = useContext(websiteDictionaryContext);
 if (!dic) throw new OutOfContext();
 return dic;
};

export { websiteDictionaryContext, useWebsiteDictionary };
