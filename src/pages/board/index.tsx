//get 요청으로 받아올 전체 post목록(임시)
import PostCards from '@/src/components/features/board/PostCards';
import { dummyData } from '@/src/components/features/board/dummyData';
//import BoardList from '@/src/components/features/board/BoardList.jsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001/api';
// const api = axios.create({
//   baseURL: serverUrl,
//   headers: { "Content-Type": "application/json" },
//   // withCredentials: true,
// });
const BoardPage = () => {
  const [boardList, setBoardList] = useState([]);
  // const handleData = () => {
  //   //아마도 검색버튼 클릭했을떄 게시글 출력하는 함수??
  //   // get요청
  // };
  const [currentpage, setCurrentpage] = useState(1);

  //Pagination  Component
  const nextPage = () => {
    setCurrentpage(currentpage + 1);
  };
  const prePage = () => {
    setCurrentpage(currentpage - 1);
  };

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  const getBoardlist = async () => {
    console.log('currentpage : ', currentpage);
    try {
      const response = await axios.get(
        `${serverUrl}/boards?page=${currentpage}`,
        config,
      );
      console.log('status:', response.status);
      console.log('data:', response.data);
      setBoardList(response.data);
      return response.data;
    } catch (error) {
      console.error('error');
      console.error(error);
    }
  };
  useEffect(() => {
    getBoardlist();
  }, [currentpage]);
  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-board.jpg')]">
      <div className="my-20">검색창을 위한 영역</div>
      {/* <div>
        <BoardList boardList={boardList} />
      </div> */}
      <div>
        <PostCards dummyData={boardList} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="pagination_box">
        {currentpage != 1 ? (
          <Link href={`board/?page=${currentpage - 1}`}>
            <button onClick={prePage}>이전 페이지</button>
          </Link>
        ) : null}

        <div> {currentpage}</div>
        {/* 현 페이지 표시  */}

        <Link href={`board/?page=${currentpage + 1}`}>
          <button onClick={nextPage}>다음 페이지</button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default BoardPage;
