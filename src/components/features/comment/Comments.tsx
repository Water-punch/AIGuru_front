import Link from 'next/link';
import { CommentProps, CommentsProps } from '../../types/CommentTypes';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import { useWriteComment } from '@/src/hooks/api/comment';
import { useRouter } from 'next/router';

const Comments = ({ commentsData }: CommentsProps) => {
  const [userInput, setUserInput] = useState('');
  const router = useRouter();
  const boardId = router.query;
  const writeComment = useWriteComment({
    boardId: boardId.postId,
    content: userInput,
  });

  const handleSubmit = async () => {
    writeComment.mutate();
  };

  useEffect(() => {
    //get
  }, [commentsData]);

  return (
    <div className="flex flex-col gap-5">
      {commentsData.map((data: CommentProps, idx: number) => (
        <Comment key={idx} {...data} />
      ))}

      <div className="flex flex-row">
        <input
          type="text"
          placeholder="댓글을 입력해 주세요"
          onChange={e => setUserInput(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>작성</button>
      </div>
    </div>
  );
};

export default Comments;
