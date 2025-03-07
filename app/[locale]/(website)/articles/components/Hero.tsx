export default function Hero() {
 return (
  <section className='mb-8 grid justify-center pt-10'>
   <div className='grid'>
    <div className='text-center font-bold text-2xl lg:text-3xl text-primary'>
     اخبار و مقـــاله‌ها
    </div>
    <div>
     <div className='h-[22rem] dark:brightness-75'>
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
