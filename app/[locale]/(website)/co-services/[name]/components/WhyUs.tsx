import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupsIcon from '@mui/icons-material/Groups';

const whyUs = [
 {
  type: 'team',
  title: 'تیم مجرب',
  text: 'text-purple-700 dark:text-purple-500',
  background: 'bg-purple-700 dark:bg-purple-500',
  icon: <GroupsIcon sx={{ fontSize: '4rem' }} />,
 },
 {
  type: 'performance',
  title: 'بهبود عملکرد',
  text: 'text-orange-700 dark:text-orange-500',
  background: 'bg-orange-700 dark:bg-orange-500',
  icon: <QueryStatsIcon sx={{ fontSize: '4rem' }} />,
 },
 {
  type: 'support',
  title: 'پشتیبانی آنلاین',
  text: 'text-primary-dark',
  background: 'bg-primary-dark',
  icon: <SupportAgentIcon sx={{ fontSize: '4rem' }} />,
 },
 {
  type: 'quality',
  title: 'کیفیت',
  text: 'text-teal-700 dark:text-teal-500',
  background: 'bg-teal-700 dark:bg-teal-500',
  icon: <SupportAgentIcon sx={{ fontSize: '4rem' }} />,
 },
];

export default function WhyUs() {
 return (
  <section id='services' className='mb-14'>
   <div className='container'>
    <div className='text-center mb-12'>
     <div className='pb-2 mb-2 relative after:content-[""] before:content-[""] after:absolute after:start-[50%] after:bottom-0 after:w-[10rem] after:translate-x-[50%] after:h-[4px] after:bg-neutral-400 before:absolute before:start-[50%] before:bottom-[1px] before:w-[15rem] before:translate-x-[50%] before:h-[2px] before:bg-neutral-400 after:rounded-3xl before:rounded-3xl'>
      <h2 className='text-2xl font-bold lg:text-3xl'>چـــــرا ما</h2>
     </div>
    </div>
   </div>
   <div className='grid gap-8 lg:grid-cols-2 container w-[min(100%,60rem)]'>
    {whyUs.map((item) => (
     <article key={item.type} className={`rounded-xl pb-2 ${item.background}`}>
      <div className='border border-neutral-300 dark:border-neutral-500 rounded-xl p-4 bg-background'>
       <div className={`text-center mb-4 ${item.text}`}>{item.icon}</div>
       <h3 className={`text-center text-lg font-medium mb-2 ${item.text}`}>
        {item.title}
       </h3>
       <p className='text-neutral-600 dark:text-neutral-400 text-center text-[0.8rem]'>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
       </p>
      </div>
     </article>
    ))}
   </div>
  </section>
 );
}
