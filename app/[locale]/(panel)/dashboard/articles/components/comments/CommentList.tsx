import { type BlogComment } from '@/services/api-actions/globalApiActions';
import Comment from './Comment';
export default function CommentList({ comments }: { comments: BlogComment[] }) {
 return (
  <ul>
   {comments.map((cm) => (
    <Comment comment={cm} key={cm.id} />
   ))}
  </ul>
 );
}
