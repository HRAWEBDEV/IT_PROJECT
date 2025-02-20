export const Hero = () => {
 return (
  <section className='h-[calc(100vh_-_(var(--header-height)_+_var(--mobile-bottom-nav-height)))]'>
   <article className='grid place-items-center h-full'>
    <h1 className='text-3xl text-center leading-[1.7] font-bold'>
     <span>متخصص در حوزه فناوری</span>
     <br />
     <span className='bg-gradient-to-br from-sky-600 to-teal-400 text-transparent bg-clip-text'>
      اطلاعات و ارتباطات
     </span>
    </h1>
   </article>
  </section>
 );
};
