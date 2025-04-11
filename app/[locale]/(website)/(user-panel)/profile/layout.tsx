import { PropsWithChildren } from 'react';
import ProfileLayout from './components/ProfileLayout';

const layout = ({ children }: PropsWithChildren) => {
 return <ProfileLayout>{children}</ProfileLayout>;
};

export default layout;
