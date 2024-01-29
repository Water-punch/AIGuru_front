//import BoardEdit from '@/src/components/features/board/BoardEdit';
import BoardWrite from '@/src/components/features/board/BoardWrite';
import { useRouter } from 'next/router';
import { useState } from 'react';

const BoardWritingPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  return <BoardWrite />;
  // return (
  //   <div>
  //     {isEdit ? (<BoardEdit/>) : (<BoardWrite />)}
  //   </div>
  // );
};

export default BoardWritingPage;
