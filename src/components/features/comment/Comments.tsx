import Link from 'next/link';
import { CommentProps, CommentsProps } from '../../types/CommentTypes';
import Comment from './Comment';
import { useEffect, useState } from 'react';
import { useWriteComment } from '@/src/hooks/api/comment';
import { useRouter } from 'next/router';

const Comments = ({ commentsData } : CommentsProps) => {
  const [userInput, setUserInput] = useState('')
  const router = useRouter();
  const { boardId } = router.query;
  const id = Number(boardId);

  // 400 오류 발생하는 이유 - 실제 db에 있는 보드가 아니여서
  const writeComment = useWriteComment({boardId: id, content: userInput})

  const handleSubmit = async () => {
    writeComment.mutate()
  }

  useEffect(() => {
    //get
  }, [commentsData])

  return (
    <div className="flex flex-col gap-5">
      {commentsData.map((data: CommentProps, idx: number) => (
        <Comment key={idx} {...data}/>
      ))}

      <div className='flex flex-row'>
        <input type='text' placeholder='댓글을 입력해 주세요' onChange={e=>setUserInput(e.target.value)}></input>
        <button onClick={handleSubmit}>작성</button>
      </div>
    </div>
  );
};

export default Comments;
