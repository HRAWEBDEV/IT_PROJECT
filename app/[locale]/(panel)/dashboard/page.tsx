import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export const generateMetadata = async ({
 params,
}: {
 params: Promise<AppParams>;
}) => {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'dashboard',
 });
 return {
  title: dic.title,
 };
};

export default function page() {
 return <div className=''></div>;
}
