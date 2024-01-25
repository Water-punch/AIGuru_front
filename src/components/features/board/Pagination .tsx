import React, { useState, useEffect } from 'react';

//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001/api';

interface PaginationProps {
  //setCurrentPage: number;
  totalContents: number;
  currentPage: number;
  contentsPerPage: number;
}

function Pagination({
  totalContents,
  contentsPerPage,
  currentPage,
  //setCurrentPage,
}: PaginationProps) {
  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  const [boardList, setBoardList] = useState<BoardDataTypeList>({
    count: 0,
    list: [],
  });

  const getBoardlist = async () => {
    console.log('currentpage : ', currentPage);
    try {
      const response = await axios.get(
        `${serverUrl}/boards?page=${currentPage}`,
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
  }, [currentPage]);

  console.log('totalContents(Pagination) : ', totalContents);
  const numPages = Math.ceil(totalContents / contentsPerPage);
  console.log('numPages(Pagination) : ', numPages);
  const [page, setPage] = useState(currentPage);
  return (
    <div className="flex justify-center items-center gap-4 m-16">
      <button
        className='border-none rounded-md px-8 py-8 m-0 bg-black text-white text-1rem transition duration-300 ease-in-out hover:bg-tomato hover:cursor-pointer hover:transform-translate-y-[-2px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-current="true"'
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array(numPages)
        //.fill()
        .map((_, i) => (
          <button
            className='border-none rounded-md px-8 py-8 m-0 bg-black text-white text-1rem transition duration-300 ease-in-out hover:bg-tomato hover:cursor-pointer hover:transform-translate-y-[-2px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-current="true"'
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
      <button
        className='border-none rounded-md px-8 py-8 m-0 bg-black text-white text-1rem transition duration-300 ease-in-out hover:bg-tomato hover:cursor-pointer hover:transform-translate-y-[-2px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-current="true"'
        onClick={() => setPage(currentPage + 1)}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
