import { PropsWithChildren } from 'react';
import ProfileLayout from './components/ProfileLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | پروفایل',
};

const layout = ({ children }: PropsWithChildren) => {
 return <ProfileLayout>{children}</ProfileLayout>;
};

export default layout;
