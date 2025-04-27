import SignUpForm from './components/components/SignUpForm';
import { getDictionary } from '@/localization/getDic';
import { type AppParams } from '@/utils/appParams';

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'auth',
 });
 return (
  <div>
   <SignUpForm dic={dic} />
  </div>
 );
}
