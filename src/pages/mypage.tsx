import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/router';
import HandleBoards from '../components/features/user/HandleBoards';
import HandleComments from '../components/features/user/HandleComments';
import HandleServices from '../components/features/user/HandleServices';
import HandleUsers from '../components/features/user/HandleUsers';
import withAuth from '../hocs/withAuth';

const limit = 15;

const MyPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  const [commentPage, setCommentPage] = useState(1);
  const [boardPage, setboardPage] = useState(1);
  const commentQuery = `?page=${commentPage}&limit=${limit}`;
  const boardQuery = `?page=${boardPage}&limit=${limit}`;
  const [selectedComponent, setSelectedComponent] = useState(<HandleUsers />);

  const handleSelectComponent = (component: any) => {
    setSelectedComponent(component);
  };

  return (
    <div className="">
      <div className="fixed left-0 top-0 h-screen w-[20vw] border-white border shadow-lg bg-pink-400 p-5 ml-50">
        <div className="mb-10">{user.userId} 임시로 보여주는 userId</div>
        <div className="flex flex-col gap-7 w-15">
          <button
            className="border border-black h-10"
            onClick={() => handleSelectComponent(<HandleUsers />)}
          >
            유저 정보
          </button>
          <button
            className="border border-black h-10"
            onClick={() => handleSelectComponent(<HandleBoards />)}
          >
            작성한 게시글
          </button>
          <button
            className="border border-black h-10"
            onClick={() => handleSelectComponent(<HandleComments />)}
          >
            작성한 댓글
          </button>
          <button
            className="border border-black h-10"
            onClick={() => handleSelectComponent(<HandleServices />)}
          >
            멤버십 정보/변경
          </button>
        </div>
      </div>
      <div className="ml-auto mt-20">{selectedComponent}</div>
    </div>
  );
};

export default withAuth(MyPage);

import * as Api from '../utils/api';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookie = context.req.headers.cookie || '';

  try {
    const res = await Api.get('/user/me', undefined, cookie);
    console.log(res);
    if (res.data) {
      return { props: {} };
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
