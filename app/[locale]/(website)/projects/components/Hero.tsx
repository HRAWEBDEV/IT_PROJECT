export default function Hero() {
 return (
  <section className='mb-8 grid justify-center pt-10'>
   <div className='grid'>
    <div className='text-center font-bold text-2xl lg:text-3xl text-secondary'>
     پروژه‌هـــا
    </div>
    <div>
     <div className='dark:brightness-[80%] h-[20rem]'>
      <img
       className='h-full'
       src='/images/projects.png'
       alt='about-us-image'
       draggable={false}
      />
     </div>
    </div>
   </div>
  </section>
 );
}
