import { useEffect, useState } from 'react';
import { useWriteComment } from '@/src/hooks/api/comment';
import { useRouter } from 'next/router';

const CommentInput = () => {
  const [userInput, setUserInput] = useState('');
  const router = useRouter();
  const boardId = router.query;

  const writeComment = useWriteComment();

  const handleSubmit = async () => {
    writeComment.mutate({
      boardId: boardId.postId,
      content: userInput,
    });
    if(writeComment.isSuccess && writeComment.data) {
      console.log('댓글 작성 성공')
      setUserInput('')
    }
  };

  return (
    <div className="flex flex-row">
      <input
        type="text"
        placeholder="댓글을 입력해 주세요"
        onChange={e => setUserInput(e.target.value)}
        value={userInput}
      ></input>
      <button onClick={handleSubmit}>작성</button>
    </div>
  )

}

export default CommentInput