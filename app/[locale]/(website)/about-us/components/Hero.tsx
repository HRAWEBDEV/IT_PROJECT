import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function Hero({ dic }: Props) {
 return (
  <section className='mb-8 grid justify-center pt-10'>
   <div className='grid'>
    <div className='text-center font-bold text-2xl lg:text-3xl text-orange-500 dark:text-orange-600'>
     {dic.title as string}
    </div>
    <div>
     <div className='dark:brightness-[80%]'>
      <img src='/images/about-us.png' alt='about-us-image' draggable={false} />
     </div>
    </div>
   </div>
  </section>
 );
}
