import styled from 'styled-components';
//import { FaSearch } from "react-icons/fa";
import BoardCard from './BoardCard';
//import PostCard from "./PostCard";
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import { Pagination } from '@mui/material'; //
import { useState } from 'react';
//import { Pagination } from "@mui/material"; //

const BoardList = ({ boardList }: boardListProps) => {
  const [searchInput, setSearchInput] = useState('');
  // 현재 페이지 1로 초기 세팅//
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 5개 보여주기 //
  const pageSize = 5;
  // 제목으로 검색 구현도 할 예정이므로
  const filteredBoardList = boardList.filter((board: BoardDataType) =>
    board.title.includes(searchInput),
  );
  // const pageCount = Math.ceil(boardList.length / pageSize);
  const currentBoardList = filteredBoardList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const BoardLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 300px;
  `;
  const BoardHead = styled.div`
    width: 898px;
    height: 68px;
    background-color: #9bcbf8;
    color: #ffffff;
    font-weight: 700;
    font-size: 30px;
    display: flex;
    align-items: center;
    margin-top: 110px;
    padding-left: 30px;
  `;
  const BoardBox = styled.form`
    width: 928px;
    height: 640px;
    background-color: #fafafa;
    margin-top: 10px;
  `;
  const WriteButtonLink = styled(Link)`
    text-decoration: none;
  `;
  const WriteButton = styled.button`
    width: 99px;
    height: 35px;
    margin-top: 10px;
    margin-left: -830px;
    background-color: #ffffff;
    border-color: #a1a1a1;
    border-width: thin;
    color: #ff8686;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
  `;
  const Search = styled.div`
    display: flex;
    margin-top: 15px;
    input {
      width: 242px;
      height: 33px;
      padding-left: 10px;
    }
    button {
      margin-left: 10px;
      width: 58px;
      height: 39px;
      background-color: #9fd0fe;
      border: none;
    }
  `;
  return (
    <BoardLayout>
      <Search>
        <input placeholder="검색어를 입력해주세요." />
        <button>
          {/* <FaSearch size="10px" /> */}
          검색
        </button>
      </Search>
      <BoardHead>게시판</BoardHead>
      <BoardBox>
        {currentBoardList.map((board, idx) => (
          <PostCard
            key={board.idx}
            id={board.id}
            title={board.title}
            content={board.content}
            nickName={board.nickName}
            viewCount={board.viewCount}
            likeCount={board.likeCount}
            commentCount={board.commentCount}
            createdAt={board.createdAt}
          />
        ))}
      </BoardBox>
      <div>
        <Link href="postpage">
          <WriteButton>글쓰기</WriteButton>
        </Link>
        {/* <PageWrapper>
          <Pagination
            variant="outlined"
            color="primary"
            page={currentPage}
            count={pageCount}
            size="large"
            onChange={(e, value: number) => {
              setCurrentPage(value);
            }}
            showFirstButton
            showLastButton
          />
        </PageWrapper> */}
      </div>
    </BoardLayout>
  );
};
export default BoardList;
