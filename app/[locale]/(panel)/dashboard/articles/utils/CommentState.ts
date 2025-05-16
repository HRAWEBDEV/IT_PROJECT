enum CommentState {
 Pending = 1,
 Approved = 2,
 Rejected = 3,
}

const commentStates = [
 {
  id: 1,
  name: 'pending',
 },
 {
  id: 2,
  name: 'approved',
 },
 {
  id: 3,
  name: 'rejected',
 },
];

export { commentStates, CommentState };
