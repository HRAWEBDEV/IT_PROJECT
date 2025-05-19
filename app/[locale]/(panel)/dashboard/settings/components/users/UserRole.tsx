import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
 getRoles,
 getUserRoles,
 Role,
 updateUserRole,
} from '@/services/api-actions/authApiActionts';
import { type User } from '@/services/api-actions/globalApiActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

type Props = {
 open: boolean;
 user: User;
 onClose: () => void;
};

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function AddTag({ open, onClose, user }: Props) {
 const [userRoles, setUserRoles] = useState<Role[]>([]);
 const { enqueueSnackbar } = useSnackbar();
 const { users, changesSavedSuccessfully, errorTryAgainLater } =
  useWebsiteDictionary() as {
   changesSavedSuccessfully: string;
   errorTryAgainLater: string;
   users: Dic;
  };

 const { data: roles = [], isLoading: isLoadingRoles } = useQuery({
  queryKey: ['roles'],
  queryFn: ({ signal }) =>
   getRoles({ signal }).then((res) => res.data.payload.Roles),
 });

 const { isLoading: isLoadingUserRoles } = useQuery({
  queryKey: ['userRoles', user.personID],
  queryFn: ({ signal }) =>
   getUserRoles({ signal, userID: user.personID }).then((res) => {
    const userRoles = res.data.payload.UserRoles;
    const selectedRoles = roles.filter((item) =>
     userRoles.some((role) => role.roleID === item.id)
    );
    setUserRoles(selectedRoles);
    return selectedRoles;
   }),
 });

 const { mutate: updateUserRoleMutate, isPending: isUpdatingUserRole } =
  useMutation({
   mutationFn: (newRole: { userID: number; roleID: number }[]) =>
    updateUserRole(newRole),
   onSuccess() {
    enqueueSnackbar({
     message: changesSavedSuccessfully,
     variant: 'success',
    });
    onClose();
   },
   onError(err: AxiosError) {
    enqueueSnackbar({
     message: (err.response?.data as string) || errorTryAgainLater,
     variant: 'error',
    });
   },
  });

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='xs'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>{users.access as string}</span>
     <IconButton color='error' onClick={onClose} loading={isUpdatingUserRole}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <Autocomplete
     multiple
     loading={isLoadingRoles || isLoadingUserRoles}
     size='small'
     isOptionEqualToValue={(option, value) => option.id === value.id}
     getOptionLabel={(option) => option.name}
     value={userRoles}
     options={roles}
     onChange={(_, newValue) => {
      setUserRoles(newValue);
     }}
     renderInput={(params) => (
      <TextField {...params} label={users.access as string} />
     )}
     renderOption={(props, option, { selected }) => {
      const { key, ...optionProps } = props;
      return (
       <li key={key} {...optionProps}>
        <Checkbox
         icon={icon}
         checkedIcon={checkedIcon}
         style={{ marginRight: 8 }}
         checked={selected}
        />
        {option.name}
       </li>
      );
     }}
    />
   </DialogContent>
   <DialogActions>
    <Button
     loading={isUpdatingUserRole}
     className='w-[6rem]'
     variant='outlined'
     color='error'
     onClick={onClose}
    >
     {users.cancel as string}
    </Button>
    <Button
     className='w-[6rem]'
     variant='contained'
     type='submit'
     loading={isUpdatingUserRole}
     onClick={() => {
      if (userRoles.length === 0) {
       onClose();
       return;
      }
      updateUserRoleMutate(
       userRoles.map((item) => ({
        userID: user.personID,
        roleID: item.id,
       }))
      );
     }}
    >
     {users.confirm as string}
    </Button>
   </DialogActions>
  </Dialog>
 );
}
