'use client';
import IconButton from '@mui/material/IconButton';
import { socials } from '@/utils/socials';
import { getSocials } from '@/services/api-actions/globalApiActions';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';

export default function SocialMedias() {
 const { data: socialsList, isSuccess } = useQuery({
  queryKey: ['socials'],
  queryFn: () => getSocials().then((res) => res.data.payload.SocialMedias),
 });

 if (isSuccess) {
  return (
   <div className='flex flex-wrap gap-4'>
    {socialsList
     .filter((item) => item.link)
     ?.map((item) => {
      const currentSocial = socials.find((s) => s.id === item.id);
      return (
       <IconButton key={item.id} color={currentSocial?.color}>
        <Link href={item.link || '#'}>{currentSocial?.icon}</Link>
       </IconButton>
      );
     })}
   </div>
  );
 }
 return (
  <div className='flex flex-wrap gap-4'>
   {Array.from({ length: 4 }, (_, i) => i).map((item) => (
    <Skeleton
     className='bg-neutral-300 dark:bg-neutral-700'
     key={item}
     variant='circular'
     width={40}
     height={40}
    />
   ))}
  </div>
 );
}
