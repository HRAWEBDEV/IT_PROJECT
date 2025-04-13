import { PropsWithChildren } from 'react';

export default function Main({ children }: PropsWithChildren) {
 return <div className='flex-grow flex'>{children}</div>;
}
