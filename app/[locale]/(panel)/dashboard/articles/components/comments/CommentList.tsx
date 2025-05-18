import { type BlogComment } from '@/services/api-actions/globalApiActions';
import Comment from './Comment';
import { CommentMode } from '../../utils/commentModes';
import { type CommentSetting } from '../../utils/commentSetting';

export default function CommentList({
 comments,
 parentComment,
 setSelectedComment,
 setSelectedParentComment,
 setCommentMode,
 onCloseAddComment,
 commentMode,
 selectedComment,
 selectedParentComment,
 depth,
 manage = true,
}: {
 depth: number;
 comments: BlogComment[];
 parentComment: BlogComment | null;
 selectedComment: BlogComment | null;
 selectedParentComment: BlogComment | null;
 commentMode: CommentMode;
 setSelectedComment: (comment: BlogComment | null) => void;
 setSelectedParentComment: (comment: BlogComment | null) => void;
 setCommentMode: (mode: CommentMode) => void;
 onCloseAddComment: () => void;
} & CommentSetting) {
 return (
  <ul>
   {comments.map((cm) => (
    <Comment
     manage={manage}
     depth={depth}
     comment={cm}
     key={cm.id}
     selectedComment={selectedComment}
     selectedParentComment={selectedParentComment}
     commentMode={commentMode}
     parentComment={parentComment}
     setSelectedComment={setSelectedComment}
     setSelectedParentComment={setSelectedParentComment}
     setCommentMode={setCommentMode}
     onCloseAddComment={onCloseAddComment}
    />
   ))}
  </ul>
 );
}
