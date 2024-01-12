// 상세조회 - 모달로 열려야..?

import { dummyData } from '@/src/components/features/board/dummyData';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BoardDetailPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  //postId를 통해서 상세게시물 조회 API 호출 - 임시로 dummyData에서 찾음
  const id = Number(postId);
  const foundPost = dummyData.find(post => post.postId === id);

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-board.jpg')]">
      <div className="bg-white flex flex-col gap-4 my-20">
        <div>{foundPost.title}</div>
        <div>{foundPost.date}</div>
        <div>{foundPost.content}</div>
      </div>
    </div>
  );
};

export default BoardDetailPage;
