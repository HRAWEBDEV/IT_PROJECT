import { type BlogComment } from '@/services/api-actions/globalApiActions';
import Comment from './Comment';

export default function CommentList({
 comments,
 depth,
}: {
 depth: number;
 comments: BlogComment[];
}) {
 return (
  <ul>
   {comments.map((cm) => (
    <Comment depth={depth} comment={cm} key={cm.id} />
   ))}
  </ul>
 );
}
