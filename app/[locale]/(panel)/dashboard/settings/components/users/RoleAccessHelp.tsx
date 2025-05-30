import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useWebsiteDictionary } from '@/services/dictionary/dictionaryContext';
import { type Dic } from '@/localization/locales';
import { useQuery } from '@tanstack/react-query';
import {
 type Role,
 getRoles,
 getRoleAccesses,
 RoleAccess,
} from '@/services/api-actions/authApiActionts';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
 open: boolean;
 onClose: () => void;
};

function RoleAccessGrid({
 isLoading,
 roleAccesses,
}: {
 isLoading: boolean;
 roleAccesses: RoleAccess[];
}) {
 const { users } = useWebsiteDictionary() as {
  users: Dic;
 };
 return (
  <div>
   <DataGrid
    loading={isLoading}
    rows={roleAccesses}
    getRowId={(row) => row.formID}
    hideFooter
    columns={[
     {
      field: 'formName',
      headerName: users.formName as string,
      minWidth: 150,
      flex: 1,
     },
     {
      field: 'write',
      headerName: users.write as string,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? (
        <CheckIcon color='success' />
       ) : (
        <ClearIcon color='error' />
       );
      },
     },
     {
      field: 'update',
      headerName: users.update as string,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? (
        <CheckIcon color='success' />
       ) : (
        <ClearIcon color='error' />
       );
      },
     },
     {
      field: 'remove',
      headerName: users.remove as string,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? (
        <CheckIcon color='success' />
       ) : (
        <ClearIcon color='error' />
       );
      },
     },
     {
      field: 'changeState',
      headerName: users.changeState as string,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell({ value }) {
       return value ? (
        <CheckIcon color='success' />
       ) : (
        <ClearIcon color='error' />
       );
      },
     },
    ]}
   />
  </div>
 );
}

export default function RoleAccessHelp({ open, onClose }: Props) {
 const [selectedRole, setSelectedRole] = useState<Role | null>(null);
 const queryClient = useQueryClient();
 const {
  data: roles,
  isLoading,
  isSuccess,
 } = useQuery({
  queryKey: ['roles-help', 'roles'],
  queryFn: ({ signal }) =>
   getRoles({ signal }).then((res) => res.data.payload.Roles),
 });

 const { isLoading: isRoleAccessesLoading } = useQuery({
  enabled: !!selectedRole,
  queryKey: ['roles-help', 'role-accesses', selectedRole?.id],
  queryFn: ({ signal }) =>
   getRoleAccesses({ signal, roleID: selectedRole?.id as number }).then(
    (res) => res.data.payload.RoleAccesses
   ),
 });

 const { users } = useWebsiteDictionary() as {
  users: Dic;
 };

 return (
  <Dialog
   open={open}
   fullWidth
   maxWidth='md'
   onClose={onClose}
   component={'form'}
   onSubmit={(e) => {
    e.preventDefault();
   }}
  >
   <DialogTitle>
    <div className='flex items-center justify-between'>
     <span className='text-base font-bold'>{users.rolesHelp as string}</span>
     <IconButton color='error' onClick={onClose}>
      <CloseIcon />
     </IconButton>
    </div>
   </DialogTitle>
   <DialogContent dividers className='bg-neutral-100 dark:bg-neutral-900'>
    {isLoading && (
     <div className='min-h-[4rem] flex items-center justify-center'>
      <CircularProgress />
     </div>
    )}
    {isSuccess && (
     <div>
      {roles.map((role) => {
       return (
        <Accordion
         key={role.id}
         className='mb-4'
         onChange={(_, expand) => {
          if (expand) {
           setSelectedRole(role);
          }
         }}
        >
         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>
           <h4>{role.name}</h4>
          </div>
         </AccordionSummary>
         <AccordionDetails>
          <RoleAccessGrid
           isLoading={isRoleAccessesLoading}
           roleAccesses={
            queryClient.getQueryData([
             'roles-help',
             'role-accesses',
             role.id,
            ]) as RoleAccess[]
           }
          />
         </AccordionDetails>
        </Accordion>
       );
      })}
     </div>
    )}
   </DialogContent>
  </Dialog>
 );
}
