import BoardEdit from '@/src/components/features/board/BoardEdit';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
interface BoardCardTypeMini {
  post: any;
}
const BoardEditingPage = ({ post }: BoardCardTypeMini) => {
  // 데이터 전달 받기
  const router = useRouter();
  console.log('데이터 전달 받기(BoardEditingPage)');
  //console.log(JSON.parse(router.query.detail));
  //const post = JSON.parse(router.query.detail);
  console.log('데이터 전달 받기(BoardEditingPage) 22222222222222');
  return <BoardEdit post={router.query.detail} />;
};

export default BoardEditingPage;
