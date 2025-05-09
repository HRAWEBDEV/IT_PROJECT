import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function Hero({ dic }: Props) {
 return (
  <section className='mb-8 grid justify-center pt-10'>
   <div className='grid'>
    <div className='text-center font-bold text-2xl lg:text-3xl text-primary'>
     {dic.title as string}
    </div>
    <div>
     <div className='h-[20rem] dark:brightness-75'>
      <img
       className='h-full'
       src='/images/articles.png'
       alt='about-us-image'
       draggable={false}
      />
     </div>
    </div>
   </div>
  </section>
 );
}
