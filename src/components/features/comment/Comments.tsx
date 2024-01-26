import { CommentProps, CommentsProps } from '../../types/CommentTypes';
import Comment from './Comment';
import { useEffect, useState } from 'react';

const Comments = ({ count, list }: CommentsProps) => {
  const commentsData = list

  return (
    <div>
      <div className="flex flex-col">
        {commentsData.map((data: CommentProps, idx: number) => (
          <div key={idx}>
            <Comment {...data} />
          </div>
        ))}
      </div>
    </div>  
  );
};

export default Comments;
