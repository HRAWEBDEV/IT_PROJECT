import { PropsWithChildren } from 'react';
import ProfileLayout from './components/ProfileLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
 title: 'آی تی نترا |‌ فناوری و اطلاعات | پروفایل',
};

const layout = async ({ children }: PropsWithChildren) => {
 return <ProfileLayout>{children}</ProfileLayout>;
};

export default layout;
