'use client';
import IconButton from '@mui/material/IconButton';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const iconStyles = { fontSize: '2.3rem' };

const menuItemStyles = {
 borderRadius: '0.5rem',
 width: '100%',
 padding: 0,
 color: 'inherit',
};

const menuOptions = [
 {
  icon: <EngineeringOutlinedIcon sx={iconStyles} />,
  title: 'خدمــــــات',
  hasSubGategories: true,
 },
 {
  icon: <EngineeringOutlinedIcon sx={iconStyles} />,
  title: 'پروژه‌هـــا',
  hasSubGategories: false,
 },
 {
  icon: <NewspaperOutlinedIcon sx={iconStyles} />,
  title: 'اخبار و مقـــالات',
  hasSubGategories: false,
 },
 {
  icon: <SupportAgentOutlinedIcon sx={iconStyles} />,
  title: 'ارتباط‌ بامـــا',
  hasSubGategories: false,
 },
];

export default function MobileMenu() {
 return (
  <section className='p-4'>
   <nav>
    <ul className='grid grid-cols-2 gap-4'>
     {menuOptions.map((menu) => (
      <li key={menu.title}>
       <IconButton sx={menuItemStyles}>
        <div className='border border-primary w-full min-h-[7rem] rounded-lg flex flex-col justify-center items-center gap-1 shadow-[-4px_4px_4px_0px] shadow-primary/10 text-primary bg-neutral-100'>
         <div>{menu.icon}</div>
         <div>
          <span className='font-medium text-base'>{menu.title}</span>
          {menu.hasSubGategories && <ArrowDropDownOutlinedIcon />}
         </div>
        </div>
       </IconButton>
      </li>
     ))}
    </ul>
   </nav>
  </section>
 );
}
