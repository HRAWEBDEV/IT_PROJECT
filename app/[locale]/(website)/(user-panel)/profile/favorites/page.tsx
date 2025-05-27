import { getDictionary } from '@/localization/getDic';
import Articles from './components/articles/Articles';
import { AppParams } from '@/utils/appParams';

export default async function page({ params }: { params: Promise<AppParams> }) {
 const { locale } = await params;
 const dic = await getDictionary({
  locale,
  path: 'articles',
 });
 return (
  <div>
   <Articles dic={dic} serverBlogs={[]} />
  </div>
 );
}
