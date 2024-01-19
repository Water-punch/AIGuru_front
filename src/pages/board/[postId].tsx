// 상세조회 - 모달로 열려야..?

import { dummyData } from '@/src/components/features/board/dummyData';
import Comments from '@/src/components/features/comment/Comments';
import { useReadBoards } from '@/src/hooks/api/board';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BoardDetailPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const id = Number(postId);
  const foundPost = dummyData.find(post => post.postId === id);

  const comment1 = { anonymous_number: 1, content: 'ㅇㅇ', boardId: 5 };
  const comment2 = { anonymous_number: 2, content: 'ㅇㅇ', boardId: 5 };
  const comment3 = { anonymous_number: 3, content: 'ㅇㅇ', boardId: 5 };
  const comment4 = { anonymous_number: 4, content: 'ㅇㅇ', boardId: 5 };
  const comment5 = { anonymous_number: 5, content: 'ㅇㅇ', boardId: 5 };
  const comment6 = { anonymous_number: 6, content: 'ㅇㅇ', boardId: 5 };
  const comment7 = { anonymous_number: 7, content: 'ㅇㅇ', boardId: 5 };
  const comment8 = { anonymous_number: 8, content: 'ㅇㅇ', boardId: 5 };
  const comment9 = { anonymous_number: 9, content: 'ㅇㅇ', boardId: 5 };

  const dummyComments = [
    comment1,
    comment2,
    comment3,
    comment4,
    comment5,
    comment6,
    comment7,
    comment8,
    comment9,
  ];

  const commentsData = { dummyComments };

  //

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-board.jpg')]">
      <div className="bg-white flex flex-col gap-4 my-20 w-[500px] h-[500px]">
        <div>{foundPost?.title}</div>
        <div>{foundPost?.date}</div>
        <div>{foundPost?.content}</div>
        <Comments commentsData={dummyComments} />
      </div>
    </div>
  );
};

export default BoardDetailPage;

export default BoardDetailPage;
