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
 return (
  <div className='flex justify-center items-center flex-col h-full'>
   <div className='text-primary-dark'>
    <div className='mb-8'>
     <img src='/images/logo.png' alt='dashboard logo' className='w-[20rem]' />
    </div>
    <p className='text-center text-2xl font-bold'>خوش آمــــدید</p>
   </div>
  </div>
 );
}
