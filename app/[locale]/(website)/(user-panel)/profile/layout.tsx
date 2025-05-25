import { PropsWithChildren } from 'react';
import ProfileLayout from './components/ProfileLayout';
import { Metadata } from 'next';
import { AppParams } from '@/utils/appParams';

export const metadata: Metadata = {
 title: 'آیتی نترا |‌ فناوری و اطلاعات | پروفایل',
};

const layout = async ({
 children,
 params,
}: PropsWithChildren<{ params: Promise<AppParams> }>) => {
 return <ProfileLayout params={params}>{children}</ProfileLayout>;
};

export default layout;
