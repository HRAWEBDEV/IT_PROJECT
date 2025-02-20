import IconButton from '@mui/material/IconButton';
import { FaPhoneSquareAlt } from 'react-icons/fa';
import { FaTelegramPlane } from 'react-icons/fa';
import { TfiInstagram } from 'react-icons/tfi';

export const Hero = () => {
 return (
  <section className='h-[calc(100vh_-_(var(--header-height)_+_var(--mobile-bottom-nav-height)))]'>
   <article className='container flex flex-col items-center justify-center h-full'>
    <h1 className='text-3xl text-center leading-[1.7] font-bold mb-6'>
     <span>متخصص در حوزه فناوری</span>
     <br />
     <span className='bg-gradient-to-br from-sky-600 to-teal-400 text-transparent bg-clip-text'>
      اطلاعات و ارتباطات
     </span>
    </h1>
    <p className='text-center leading-7 mb-10'>
     ---- با کادری مجرب و تجهیزات بروز با بیش از 10 سال سابقه در خشان در زمینه
     زیرساخت شبکه های کامپیوتری و مخابراتی و همچنین سیستم های حفاظتی و نظارتی
     آماده خدمت رسانی به شرکت ها و موسسات می باشد
    </p>
    <div className='flex gap-4 flex-wrap'>
     <IconButton>
      <FaPhoneSquareAlt fontSize={'2rem'} />
     </IconButton>
     <IconButton>
      <TfiInstagram fontSize={'2rem'} />
     </IconButton>
     <IconButton>
      <FaTelegramPlane fontSize={'2rem'} />
     </IconButton>
    </div>
   </article>
  </section>
 );
};
