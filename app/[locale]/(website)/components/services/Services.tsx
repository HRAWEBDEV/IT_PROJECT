'use client';
import Link from 'next/link';
import StorageIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import HandymanIcon from '@mui/icons-material/Handyman';
import SecurityIcon from '@mui/icons-material/Security';
// import HandymanIcon from '@mui/icons-material/Handyman';

const iconSize = '3rem';
const projects = [
 {
  title: 'نصب سرور',
  icon: <StorageIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-sky-600 dark:bg-sky-300',
 },
 {
  title: 'نصب وای فای',
  icon: <WifiIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-teal-600 dark:bg-teal-300',
 },
 {
  title: 'امنیت',
  icon: <SecurityIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-red-600 dark:bg-red-300',
 },
 {
  title: 'خدمات',
  icon: <HandymanIcon sx={{ fontSize: iconSize }} />,
  color: 'bg-orange-600 dark:bg-orange-300',
 },
];

export default function Services() {
 return (
  <section id='services'>
   <div className='container mb-12'>
    <div className='mx-auto w-[min(100%,60rem)]'>
     <ul className='grid gap-8 md:grid-cols-2'>
      {projects.map((item, i) => (
       <li key={item.title}>
        <Link
         className='flex gap-4 p-2 transition-colors hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 rounded-lg'
         href='#'
        >
         <div
          className={`flex-shrink-0 aspect-square w-[6rem] rounded-lg grid place-content-center text-background ${
           item.color
          } ${(i + 1) % 2 != 0 ? 'md:order-2' : ''}`}
         >
          {item.icon}
         </div>
         <div className={`flex-grow ${(i + 1) % 2 != 0 ? 'md:order-1' : ''}`}>
          <h3 className='font-medium text-lg'>{item.title}</h3>
          <p className='text-justify text-[0.85rem] text-neutral-500 dark:text-neutral-200'>
           لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
           استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          </p>
         </div>
        </Link>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </section>
 );
}
