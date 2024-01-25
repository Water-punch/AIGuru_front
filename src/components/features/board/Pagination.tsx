import { RootState } from '@/src/store';
import { savePage } from '@/src/store/page';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  const numPages = Math.ceil(totalContents / contentsPerPage);
  const [page, setPage] = useState(currentPage);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center gap-4 m-16">
      <Link href={`board/?page=${page - 1}`}>
        <button
          className='border-none rounded-md px-8 py-8 m-0 bg-black text-white text-1rem transition duration-300 ease-in-out hover:bg-tomato hover:cursor-pointer hover:transform-translate-y-[-2px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-current="true"'
          onClick={() => {
            console.log('첫번째 버튼 클릭, page: ', page)
            setPage(page - 1)
            dispatch(savePage({ page: page - 1 }))
          }}
          disabled={page === 1}
        >
          &lt;
        </button>
      </Link>
      
      {Array(numPages)
        .fill(undefined)
        .map((_, i) => (
          <Link href={`board/?page=${page}`} key={i + 1}>
            <button
              className='border-none rounded-md px-8 py-8 m-0 bg-black text-white text-1rem transition duration-300 ease-in-out hover:bg-tomato hover:cursor-pointer hover:transform-translate-y-[-2px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-current="true"'
              onClick={() => {
                console.log('map으로 생성한 버튼 클릭, page: ', page)
                setPage(i + 1) 
                dispatch(savePage({ page: page + 1 }))
              }}
              aria-current={page === i + 1 ? 'page' : undefined}
              // 활성화된 페이지 버튼을 나타내기 위해 사용됨.
            >
              {i + 1}
            </button>
          </Link>    
        ))}
      <Link href={`board/?page=${page + 1}`}>
        <button
          className='border-none rounded-md px-8 py-8 m-0 bg-black text-white text-1rem transition duration-300 ease-in-out hover:bg-tomato hover:cursor-pointer hover:transform-translate-y-[-2px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none" aria-current="true"'
          onClick={() => {
            console.log('마지막 버튼 클릭, page: ', page)
            setPage(page + 1)
            dispatch(savePage({ page: page + 1 }))
          }}
          disabled={page === numPages}
        >
          &gt;
        </button>
      </Link>
    </div>
  );
}

export default Pagination;
