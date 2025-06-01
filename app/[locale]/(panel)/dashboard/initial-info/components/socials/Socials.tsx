'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
 type Social,
 getSocials,
 addSocial,
} from '@/services/api-actions/globalApiActions';
import CircularProgress from '@mui/material/CircularProgress';
import { useAccessContext } from '../../../services/access/accessContext';
import NoAccessGranted from '../../../components/NoAccessGranted';
import { socials as socialsMap } from '@/utils/socials';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { numberReplacer } from '@/utils/numberReplacer';

export default function Socials() {
 const { enqueueSnackbar } = useSnackbar();
 const queryClient = useQueryClient();
 const { roleAccess } = useAccessContext();
 const { socials, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   socials: Dic;
   noItemsFound: string;
   errorTryAgainLater: string;
   changesSavedSuccessfully: string;
  };

 const [socialsList, setSocialsList] = useState<Social[]>([]);

 const { isLoading } = useQuery({
  queryKey: ['dashboard', 'socials'],
  enabled: socialsList.length === 0,
  async queryFn() {
   const savedSocials = await getSocials().then(
    (res) => res.data.payload.SocialMedias
   );
   setSocialsList(
    savedSocials.map((item) => ({ ...item, link: item.link || '' }))
   );
   return savedSocials;
  },
 });

 const { mutate: addSocials, isPending: isAddingSocials } = useMutation({
  mutationFn() {
   return addSocial(
    socialsList.map((item) => {
     let validLink = item.link;
     const social = socialsMap.find((social) => social.id === item.id);
     if (
      item.link &&
      !item.link.startsWith('https://') &&
      social?.name !== 'phone'
     ) {
      validLink = `https://${item.link}`;
     }
     return {
      id: item.id,
      link: validLink || null,
     };
    })
   );
  },
  onSuccess() {
   enqueueSnackbar({
    variant: 'success',
    message: changesSavedSuccessfully,
   });
   setSocialsList([]);
   queryClient.invalidateQueries({ queryKey: ['dashboard', 'socials'] });
  },
  onError(err: AxiosError) {
   enqueueSnackbar({
    variant: 'error',
    message: (err.response?.data as string) || errorTryAgainLater,
   });
  },
 });

 if (isLoading) {
  return (
   <div className='flex justify-center items-center min-h-[20rem]'>
    <CircularProgress />
   </div>
  );
 }
 if (!roleAccess.read) {
  return <NoAccessGranted />;
 }

 return (
  <section>
   <h1 className='font-bold text-2xl mb-4'>{socials.title as string}</h1>
   <form className='bg-background border border-neutral-300 dark:border-neutral-700 rounded-lg p-4'>
    <ul className='grid gap-4 mb-4'>
     {socialsList.map((item) => {
      const social = socialsMap.find((social) => social.id === item.id);
      return (
       <li key={item.id}>
        <div className='flex items-center gap-4'>
         <div className='min-w-[8rem] flex items-center gap-2'>
          <IconButton sx={{ padding: 0 }} color={social?.color}>
           {social?.icon}
          </IconButton>
          <span>{item.name}</span>
         </div>
         <div
          className='flex-grow font-enRoboto text-end'
          style={{ direction: 'ltr' }}
         >
          <TextField
           name={social?.name || ''}
           placeholder={social?.placeholder}
           fullWidth
           size='small'
           value={item.link || ''}
           onChange={(e) => {
            setSocialsList(
             socialsList.map((social) =>
              social.id === item.id
               ? { ...social, link: numberReplacer(e.target.value) }
               : social
             )
            );
           }}
          />
         </div>
        </div>
       </li>
      );
     })}
    </ul>
    <div className='flex justify-end'>
     <Button
      className='w-[8rem]'
      variant='contained'
      loading={isAddingSocials}
      onClick={() => {
       addSocials();
      }}
     >
      {socials.confirm as string}
     </Button>
    </div>
   </form>
  </section>
 );
}
