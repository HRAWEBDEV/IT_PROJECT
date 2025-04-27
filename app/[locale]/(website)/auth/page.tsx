import LoginForm from './components/LoginForm';
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
   <LoginForm dic={dic} />
  </div>
 );
}
