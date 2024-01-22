export interface CommentProps {
  boardId: string;
  content: string;
}

export interface CommentType {
  commentData: CommentProps;
}

export interface CommentsProps {
  commentsData: CommentProps[];
}
