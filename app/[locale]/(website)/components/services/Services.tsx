'use client';
import Link from 'next/link';
import StorageIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import HandymanIcon from '@mui/icons-material/Handyman';
import SecurityCameraIcon from '@/components/icons/SecurityCameraIcon';
// import HandymanIcon from '@mui/icons-material/Handyman';

const iconSize = '2.5rem';
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
  title: 'نصب دوربین',
  icon: (
   <SecurityCameraIcon width={iconSize} height={iconSize} fill='currentColor' />
  ),
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
  <section id='services' className='mb-20'>
   <div className='container'>
    <div className='text-center mb-8'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[50%] after:bottom-0 after:w-[10rem] after:translate-x-[50%] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[50%] before:bottom-[1px] before:w-[15rem] before:translate-x-[50%] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>خدمــــات</h2>
     </div>
     <p className='text-neutral-500 dark:text-neutral-200 w-[min(100%,40rem)] text-center leading-7 mb-10 container lg:text-base lg:leading-7'>
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی
     </p>
    </div>
    <div className='mx-auto w-[min(100%,60rem)]'>
     <ul className='grid gap-8 md:grid-cols-2'>
      {projects.map((item, i) => (
       <li key={item.title}>
        <Link
         className='flex gap-4 p-2 transition-colors hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 rounded-lg'
         href='#'
        >
         <div
          className={`flex-shrink-0 aspect-square w-[5.5rem] rounded-lg grid place-content-center text-background ${
           item.color
          } ${(i + 1) % 2 != 0 ? 'md:order-2' : ''}`}
         >
          {item.icon}
         </div>
         <div className={`flex-grow ${(i + 1) % 2 != 0 ? 'md:order-1' : ''}`}>
          <h3 className='font-medium text-lg'>{item.title}</h3>
          <p className='text-justify text-[0.85rem] text-neutral-500 dark:text-neutral-200'>
           لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با فیک
           است، چاپگرها و متون بلکه روزنامه و مجله در
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
