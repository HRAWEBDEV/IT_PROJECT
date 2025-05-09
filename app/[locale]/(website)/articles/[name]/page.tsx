import WhyUs from './components/WhyUs';
import Content from './components/Content';
import CommentSection from './components/comments/CommentSection';

export default function page() {
 return (
  <section>
   <Content />
   <WhyUs />
   <CommentSection />
  </section>
 );
}
