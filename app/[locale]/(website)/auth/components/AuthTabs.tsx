'use client';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import BadgeIcon from '@mui/icons-material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import Tab from '@mui/material/Tab';

export default function AuthTabs() {
 return (
  <div>
   <Tabs
    indicatorColor='secondary'
    textColor='secondary'
    value={'login'}
    centered
    sx={{
     '& .MuiTabs-flexContainer': {
      width: '100%',
     },
     '& .MuiButtonBase-root': {
      flexGrow: 1,
      flexBasis: 0,
      fontWeight: 500,
     },
    }}
   >
    <Tab
     LinkComponent={Link}
     href='/auth'
     icon={<LoginIcon fontSize='large' />}
     value='login'
     label='ورود'
    />
    <Tab
     LinkComponent={Link}
     href='/auth/sign-up'
     icon={<BadgeIcon fontSize='large' />}
     value='sign-up'
     label='ثبت نام'
    />
   </Tabs>
  </div>
 );
}
