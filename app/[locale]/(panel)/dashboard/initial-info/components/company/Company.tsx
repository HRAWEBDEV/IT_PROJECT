'use client';
import { useState } from 'react';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
 type Owner,
 getOwner,
 updateOwner,
} from '@/services/api-actions/authApiActionts';
import CircularProgress from '@mui/material/CircularProgress';
import { useAccessContext } from '../../../services/access/accessContext';
import NoAccessGranted from '../../../components/NoAccessGranted';

const phoneNumberLimit = 3;
const mobileNumberLimit = 3;

type FormInfo = Pick<
 Owner,
 | 'ownerName'
 | 'nationalCode'
 | 'email'
 | 'fax'
 | 'addressName'
 | 'descriptionName'
 | 'postalCode'
> & {
 phoneNumbers: Owner['cellPhone1'][];
 mobileNumbers: Owner['telephone1'][];
};

const defaultFormInfo: FormInfo = {
 ownerName: '',
 nationalCode: '',
 email: '',
 fax: '',
 addressName: '',
 descriptionName: '',
 postalCode: '',
 phoneNumbers: [''],
 mobileNumbers: [''],
};

export default function Company() {
 const [formInfo, setFormInfo] = useState<FormInfo>(defaultFormInfo);
 const queryClient = useQueryClient();
 const { roleAccess } = useAccessContext();
 const { initialInfo, noItemsFound } = useWebsiteDictionary() as {
  initialInfo: Dic;
  noItemsFound: string;
 };

 // const { mutate: updateOwnerMutate, isPending: isUpdating } = useMutation({
 //  mutationFn() {},
 // });

 const {
  data: owner,
  isLoading,
  isError,
 } = useQuery({
  queryKey: ['owner'],
  async queryFn({ signal }) {
   const owner = await getOwner({ signal }).then((res) => res.data);
   return owner;
  },
 });

 if (!roleAccess.read) {
  return <NoAccessGranted />;
 }

 if (isLoading) {
  return (
   <div className='flex justify-center items-center min-h-[20rem]'>
    <CircularProgress />
   </div>
  );
 }

 if (isError || !owner) {
  return (
   <div className='flex justify-center items-center min-h-[20rem]'>
    <p className='text-lg font-medium text-red-600 dark:text-red-400'>
     {noItemsFound}
    </p>
   </div>
  );
 }

 return (
  <section>
   <h1 className='font-bold text-2xl mb-4'>{initialInfo.title as string}</h1>
   <form className='bg-background border border-neutral-300 dark:border-neutral-700 rounded-lg p-4'>
    <div className='grid gap-4'>
     <div className='grid grid-cols-2 gap-4'>
      <TextField
       name='ownerName'
       size='small'
       label={initialInfo.name as string}
       value={formInfo.ownerName}
       onChange={(e) => setFormInfo({ ...formInfo, ownerName: e.target.value })}
      />
      <TextField
       name='nationalCode'
       size='small'
       label={initialInfo.nationalCode as string}
       value={formInfo.nationalCode}
       onChange={(e) =>
        setFormInfo({ ...formInfo, nationalCode: e.target.value })
       }
      />
      <TextField
       name='email'
       size='small'
       label={initialInfo.email as string}
       value={formInfo.email}
       onChange={(e) => setFormInfo({ ...formInfo, email: e.target.value })}
      />
      <TextField
       name='fax'
       size='small'
       label={initialInfo.faxNumber as string}
       value={formInfo.fax}
       onChange={(e) => setFormInfo({ ...formInfo, fax: e.target.value })}
      />
     </div>
     <div className='grid gap-4'>
      {formInfo.phoneNumbers.map((no, index) => (
       <div className='flex gap-4' key={index}>
        <TextField
         name={`phoneNumber-${index}`}
         className='flex-grow'
         fullWidth
         size='small'
         label={initialInfo.telePhoneNumber as string}
         value={no}
         onChange={(e) =>
          setFormInfo((pre) => {
           const newPhoneNumbers = [...pre.phoneNumbers];
           newPhoneNumbers[index] = e.target.value;
           return { ...pre, phoneNumbers: newPhoneNumbers };
          })
         }
        />
        <div className='flex gap-2'>
         <IconButton
          color='error'
          disabled={formInfo.phoneNumbers.length === 1}
          onClick={() => {
           setFormInfo((pre) => {
            const newPhoneNumbers = [...pre.phoneNumbers];
            newPhoneNumbers.splice(index, 1);
            return { ...pre, phoneNumbers: newPhoneNumbers };
           });
          }}
         >
          <RemoveCircleOutlineIcon />
         </IconButton>
         <IconButton
          color='secondary'
          disabled={formInfo.phoneNumbers.length >= phoneNumberLimit}
          onClick={() => {
           setFormInfo((pre) => {
            const newPhoneNumbers = [...pre.phoneNumbers];
            newPhoneNumbers.push('');
            return { ...pre, phoneNumbers: newPhoneNumbers };
           });
          }}
         >
          <AddCircleOutlineIcon />
         </IconButton>
        </div>
       </div>
      ))}
     </div>
     <div className='grid gap-4'>
      {formInfo.mobileNumbers.map((no, index) => (
       <div className='flex gap-4' key={index}>
        <TextField
         name={`mobileNumber-${index}`}
         className='flex-grow'
         size='small'
         label={initialInfo.mobileNumber as string}
         value={no}
         onChange={(e) =>
          setFormInfo((pre) => {
           const newMobileNumbers = [...pre.mobileNumbers];
           newMobileNumbers[index] = e.target.value;
           return { ...pre, mobileNumbers: newMobileNumbers };
          })
         }
        />
        <div className='flex gap-2'>
         <IconButton
          color='error'
          disabled={formInfo.mobileNumbers.length === 1}
          onClick={() => {
           setFormInfo((pre) => {
            const newMobileNumbers = [...pre.mobileNumbers];
            newMobileNumbers.splice(index, 1);
            return { ...pre, mobileNumbers: newMobileNumbers };
           });
          }}
         >
          <RemoveCircleOutlineIcon />
         </IconButton>
         <IconButton
          color='secondary'
          disabled={formInfo.mobileNumbers.length >= mobileNumberLimit}
          onClick={() => {
           setFormInfo((pre) => {
            const newMobileNumbers = [...pre.mobileNumbers];
            newMobileNumbers.push('');
            return { ...pre, mobileNumbers: newMobileNumbers };
           });
          }}
         >
          <AddCircleOutlineIcon />
         </IconButton>
        </div>
       </div>
      ))}
     </div>
     <TextField
      name='addressName'
      value={formInfo.addressName}
      onChange={(e) =>
       setFormInfo({ ...formInfo, addressName: e.target.value })
      }
      multiline
      rows={2}
      fullWidth
      size='small'
      label={initialInfo.address as string}
     />
     <TextField
      name='descriptionName'
      multiline
      rows={4}
      fullWidth
      size='small'
      label={initialInfo.description as string}
      value={formInfo.descriptionName}
      onChange={(e) =>
       setFormInfo({ ...formInfo, descriptionName: e.target.value })
      }
     />
    </div>
    {roleAccess.update && (
     <div className='flex justify-end gap-4 mt-6'>
      <Button className='w-[8rem]' variant='contained' color='primary'>
       {initialInfo.save as string}
      </Button>
     </div>
    )}
   </form>
  </section>
 );
}
