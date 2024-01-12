import { useRouter } from 'next/router';

const BoardWritingPage = () => {
  const router = useRouter();

  const handleSubmit = () => {
    // post 요청, res로 postId 받아오기

    router.push('/board/[postId]');
  };

  return (
    <div>
      <div>BoardWritingPage</div>
      <button onClick={handleSubmit}>완료</button>
    </div>
  );
};

export default BoardWritingPage;
