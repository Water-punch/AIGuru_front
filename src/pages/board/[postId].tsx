// 상세조회 - 모달로 열려야..?

import { dummyData } from '@/src/components/features/board/dummyData';
import Comments from '@/src/components/features/comment/Comments';
import { useReadBoards } from '@/src/hooks/api/board';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BoardDetailPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const id = Number(boardId);
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-board.jpg')]">
      <div className="bg-white flex flex-col gap-4 my-20 w-[500px] h-[500px]">

        {/* <Comments commentsData={}/> */}
      </div>
    </div>
  );
};

export default BoardDetailPage;
