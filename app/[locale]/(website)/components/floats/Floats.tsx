'use client';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/services/app-config/appConfig';

const buttonsStyles = {
 borderRadius: '50%',
 height: '3.7rem',
 width: '3.7rem',
 padding: 0,
 minWidth: 'unset',
 minHeight: 'unset',
};

const excludePaths = ['contact-us', 'about-us', 'auth', 'profile'];

export default function Floats() {
 const [isVisible, setIsVisible] = useState(false);
 const pathname = usePathname();
 const { locale } = useAppConfig();

 let showFloats = true;

 for (const path of excludePaths) {
  if (pathname.startsWith(`/${locale}/${path}`)) {
   showFloats = false;
  }
 }

 useEffect(() => {
  const windowHeight = window.innerHeight;
  const visibleLimit = windowHeight + 100;
  function getBodyTopPosition() {
   return Math.abs(document.body.getBoundingClientRect().top);
  }
  function checkVisibility() {
   const bodyTopPosition = getBodyTopPosition();
   if (bodyTopPosition > visibleLimit) {
    setIsVisible(true);
   } else {
    setIsVisible(false);
   }
  }
  const windowScrollWatcher = () => {
   checkVisibility();
  };
  checkVisibility();
  window.addEventListener('scroll', windowScrollWatcher);
  return () => window.removeEventListener('scroll', windowScrollWatcher);
 }, []);

 return (
  <>
   {showFloats && (
    <div
     className={`fixed transition-opacity bottom-[4rem] end-[4rem] hidden lg:flex flex-col gap-4 ${
      isVisible ? 'opacity-100' : 'opacity-0'
     }`}
    >
     <Button
      LinkComponent={Link}
      href='/contact-us'
      color='secondary'
      sx={buttonsStyles}
      variant='contained'
     >
      <div className='flex items-center justify-center'>
       <SupportAgentIcon fontSize='large' />
      </div>
     </Button>
     <Button
      sx={buttonsStyles}
      className='!bg-background'
      variant='outlined'
      onClick={() => {
       window.scrollTo({
        top: 0,
        behavior: 'smooth',
       });
      }}
     >
      <div className='flex items-center justify-center'>
       <ArrowUpwardIcon />
      </div>
     </Button>
    </div>
   )}
  </>
 );
}
