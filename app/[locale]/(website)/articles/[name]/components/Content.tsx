'use client';
import { type Blog } from '@/services/api-actions/globalApiActions';
import { useAppConfig } from '@/services/app-config/appConfig';
import { WithDictionary } from '@/localization/locales';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation } from '@tanstack/react-query';
import { toggleBlogInterested } from '@/services/api-actions/globalApiActions';

type Props = {
 blog: Blog | null;
};

export default function Content({ blog, dic }: Props & WithDictionary) {
 const { userInfo } = useAuthCheck();
 const [isInterested, setIsInterested] = useState(blog?.interested || false);
 const { locale } = useAppConfig();
 const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
 });

 const { mutate: toggleBlogInterestedMutation, isPending } = useMutation({
  mutationFn: () => {
   return toggleBlogInterested({
    blogID: blog?.id || 0,
    locale,
   });
  },
  onSuccess: () => {
   setIsInterested((prev) => !prev);
  },
 });

 return (
  <section className='container mt-6 mb-12'>
   <div className='mb-8 flex flex-wrap gap-4 items-center justify-between'>
    <div>
     <span>{dic.publishedAt as string}</span>
     <span className='font-medium'>
      {dateFormatter.format(new Date(blog?.createDateTimeOffset || ''))}
     </span>
    </div>
    {userInfo && (
     <div>
      <Button
       variant='outlined'
       loading={isPending}
       color={isInterested ? 'error' : 'primary'}
       onClick={() => {
        toggleBlogInterestedMutation();
       }}
      >
       <div className='flex gap-2 items-center'>
        <FavoriteIcon />
        <span>
         {isInterested
          ? (dic.removeFromFavorites as string)
          : (dic.addToFavorites as string)}
        </span>
       </div>
      </Button>
     </div>
    )}
   </div>
   <article
    className='ck-content'
    dangerouslySetInnerHTML={{ __html: blog?.body || '' }}
   ></article>
  </section>
 );
}
