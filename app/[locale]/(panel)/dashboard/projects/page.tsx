import ProjectsWrapper from './components/ProjectsWrapper';
import AccessProvider from '../services/access/AccessProvider';

export default function page() {
 return (
  <section className='p-4 mx-auto w-[min(100%,80rem)]'>
   <AccessProvider formTitle='projectsList'>
    <ProjectsWrapper />
   </AccessProvider>
  </section>
 );
}
