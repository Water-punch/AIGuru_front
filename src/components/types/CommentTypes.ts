export interface CommentProps {
  boardId: number;
  content: string;
}

export interface CommentType {
  commentData: CommentProps
}

export interface CommentsProps {
  commentsData: CommentProps[]
}

