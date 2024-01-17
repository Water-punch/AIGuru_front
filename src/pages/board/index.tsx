//get 요청으로 받아올 전체 post목록(임시)
import PostCards from '@/src/components/features/board/PostCards';
import { dummyData } from '@/src/components/features/board/dummyData';
import Link from 'next/link';

const BoardPage = () => {

  const handleData = () => {
    // get요청
  }
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-board.jpg')]">
      <div className="my-20">검색창을 위한 영역</div>

      <div>
        <PostCards dummyData={dummyData} />
      </div>
    </div>
  );
};

export default BoardPage;