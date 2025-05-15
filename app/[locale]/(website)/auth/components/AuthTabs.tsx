'use client';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import LoginIcon from '@mui/icons-material/Login';
import Tab from '@mui/material/Tab';
import { usePathname } from 'next/navigation';
import { type WithDictionary } from '@/localization/locales';

type Props = WithDictionary;

export default function AuthTabs({ dic }: Props) {
 const pathname = usePathname();
 const lastPart = pathname.split('/').at(-1);

 return (
  <div>
   <Tabs
    className='opacity-0'
    indicatorColor='secondary'
    textColor='secondary'
    value={lastPart === 'sign-up' ? 'sign-up' : 'login'}
    centered
    sx={{
     '& .MuiTabs-flexContainer': {
      width: '100%',
     },
     '& .MuiButtonBase-root': {
      flexGrow: 1,
      flexBasis: 0,
      fontWeight: 500,
      maxWidth: 'unset',
     },
    }}
   >
    <Tab
     LinkComponent={Link}
     href='/auth'
     icon={<LoginIcon fontSize='large' />}
     value='login'
     label={dic.signIn as string}
    />
   </Tabs>
  </div>
 );
}
