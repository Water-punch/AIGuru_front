export interface CommentProps {
  boardId?: number;
  content: string;
  anonymous_number: number;
}

export interface CommentType {
  commentData: CommentProps
}

export interface CommentsProps {
  commentsData: CommentProps[]
}

