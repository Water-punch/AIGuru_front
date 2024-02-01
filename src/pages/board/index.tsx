//get 요청으로 받아올 전체 post목록(임시)
import PostCards from '@/src/components/features/board/PostCards';
import { dummyData } from '@/src/components/features/board/dummyData';
//import BoardList from '@/src/components/features/board/BoardList.jsx';
import Link from 'next/link';
import { useEffect, useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
//백엔드 통신 관련 임시코드
import axios from 'axios';
import Pagination from '@/src/components/features/board/Pagination';
import { RootState } from '@/src/store';
import withAuth from '@/src/hocs/withAuth';
const serverUrl = 'http://localhost:5001/api';
// const api = axios.create({
//   baseURL: serverUrl,
//   headers: { "Content-Type": "application/json" },
//   // withCredentials: true,
// });
const BoardPage = () => {
  const [boardList, setBoardList] = useState<BoardDataTypeList>({
    count: 0,
    list: [],
  });

  const router = useRouter();
  const { page } = router.query;
  //const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  /*
  const [currentpage, setCurrentpage] = useState(1);
  const pageState = useSelector((state: RootState) => state.page);

  //Pagination  Component
  const nextPage = () => {
    setCurrentpage(currentpage + 1);
  };
  const prePage = () => {
    setCurrentpage(currentpage - 1);
  };
*/
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  //const dispatch = useDispatch();

  // const getBoardlist = async () => {
  //   console.log('currentpage : ', currentpage);
  //   try {
  //     const response = await axios.get(
  //       `${serverUrl}/boards?page=${currentpage}`,
  //       config,
  //     );
  //     console.log('status:', response.status);
  //     console.log('data:', response.data);
  //     setBoardList(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('error');
  //     console.error(error);
  //   }
  // };

  //검색기능구현
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; //event.target에서 name과 value만 가져오기
    console.log('value(event.target) : ', value);
    setSearchInput(value);
  };

  const getKeyword = () => {
    setSearchKeyword(searchInput);
    setCurrentPage(1);
  };
  const getBoardlist = async (searchKeyword: String) => {
    //console.log('currentpage(pageState) : ', pageState);
    console.log('page(getBoardlist) : ', page);
    console.log('currentPage(getBoardlist) : ', currentPage);
    try {
      // let response = await axios.get(
      //   `${serverUrl}/boards?page=${page}`,
      //   config,
      // );
      //let response;
      const response = await axios.get(
        `${serverUrl}/boards?keyword=${searchKeyword}&page=${currentPage}`,
        config,
      );
      console.log('searchKeyword : ', searchKeyword);

      // if (!searchKeyword || searchKeyword === '') {
      //   console.log('searchKeyword(nokeyword) : ', searchKeyword);
      //   response = await axios.get(`${serverUrl}/boards?page=${page}`, config);
      // } else {
      //   console.log('searchKeyword(yeskeyword) : ', searchKeyword);
      //   response = await axios.get(
      //     `${serverUrl}/boards?keyword=${searchKeyword}&page=${page}`,
      //     config,
      //   );
      // }

      console.log('searchKeyword 22222222222222: ', searchKeyword);
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
    getBoardlist(searchKeyword);
  }, [searchKeyword]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  console.log('paginate : ', paginate);
  console.log('useEffect(page) 11111111111111111: ', page);
  useEffect(() => {
    console.log('useEffect(page) 22222222222222222: ', page);
    // 페이지 변경 시
    if (!page) return;
    setCurrentPage(Number(page)); // 현재 페이지 상태 변경 -> Pagination리렌더링
    getBoardlist(searchKeyword); // 컨텐츠 데이터 새롭게 불러와 상태 변경 -> ProductList리렌더링
  }, [page]);

  console.log('boardList.count : ', boardList.count);

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-[url('/images/background-board.jpg')]">
      <div className="my-20">
        {' '}
        <input
          type="text"
          name="sv"
          id=""
          placeholder="검색어를 입력하세요"
          value={searchInput}
          onChange={(event) => handleInputChange(event)}
        />
        {/* <button onClick={getBoardlist(searchKeyword)}>검색</button> */}
        <button onClick={getKeyword}>검색</button>
      </div>
      {/* <div>
        <BoardList boardList={boardList} />
      </div> */}
      <div>
        <PostCards count={boardList.count} list={boardList.list} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <div className="pagination_box">
        {currentpage != 1 ? (
          <Link href={`board/?page=${currentpage - 1}`}>
            <button onClick={prePage}>이전 페이지</button>
          </Link>
        ) : null}

        <div> {currentpage}</div>

        <Link href={`board/?page=${currentpage + 1}`}>
          <button onClick={nextPage}>다음 페이지</button>
        </Link>
      </div> */}
      <Pagination
        totalContents={boardList.count}
        contentsPerPage={15}
        currentPage={currentPage}
        paginate={paginate}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default withAuth(BoardPage);
