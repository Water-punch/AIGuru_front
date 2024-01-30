//import { AiOutlineEllipsis } from "react-icons/ai";
//import { FaHeart, FaCommentAlt } from "react-icons/fa";
import PostModal from './PostModal';
import { useState, useEffect } from 'react';
//import BoardAnswer from "./BoardAnswer";
//import { Link } from "react-router-dom";
import Link from 'next/link';
import BoardEdit from './BoardEdit';
import React from 'react';
import DOMPurify from 'dompurify';

//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001/api';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const BoardCardDetail = ({ id, post }: BoardCardType) => {
  //로그인여부 본인게시글
  const userState = useSelector((state: RootState) => state.user.user);
  const [isUser, setIsUser] = useState(false);
  const cleanContent = DOMPurify.sanitize(post.content)

  // 처음엔 모달이 닫혀있다가 누르면 버튼이 열리게 //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  let [like, setLike] = useState(0);
  let [count, setCount] = useState(0);

  const router = useRouter();
  
  // delete 요청 코드
  const onDelete = async () => {
    try {
      console.log('post.boardId(onDelete) : ', post.boardId);
      const response = await api.delete(`${serverUrl}/boards/${post.boardId}`);
      if (response.status === 200) {
        window.alert('게시글 삭제되었습니다.😎');
        console.log(
          `=====================게시글 삭제하면 무조건 여기로 오나================`,
        );
        console.log(`게시글 삭제되었습니다.`);
        router.push(`/board`);
      } else {
        console.log(`delete error`);
        router.push(`/board/${post.boardId}`);
      }
    } catch (error) {
      console.log('delete error(catch)');
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userState, post);
    if (userState && post && userState.userId === post.userId) {
      setIsModalOpen(true);
      setIsUser(true);
      // console.log('setIsUser(true): ', isUser);
      // console.log('setIsModalOpen(true): ', isModalOpen);
    }
  }, [post, userState]);
  console.log('isUser : ', isUser);
  console.log('isModalOpen : ', isModalOpen);
  return (
    <>
      <div className="flex flex-col justify-between w-180 h-[100%] left-1/2 box-border">
        <div className="boardwrap">
          <div className="text-blue-500 bg-white w-860 h-40 flex justify-center items-center p-10 text-35 font-bold border-b-2 border-blue-500">
            통합 게시판
          </div>
          <button>
            <Link href="/board/">목록</Link>
          </button>
          <br />
          {!isUser ? (
            <div></div>
          ) : (
            <div>
              <Link
                href={{
                  pathname: '/board/edit',
                  query: {
                    detail: JSON.stringify(post),
                  },
                }}
                as="/board/edit"
              >
                수정
              </Link>

              <br />
              <button
                onClick={() => {
                  if (window.confirm('정말로 삭제하시겠습니까?')) {
                    onDelete();
                    //alert('게시물이 삭제되었습니다😎');
                    //window.location.href = '/board';
                  }
                }}
              >
                삭제
              </button>
            </div>
          )}
          <br />
          <div className="boardview border-2 border-black">
            <div className="h-70 p-100 border-b-1 border-solid border-black;">
              <div className=" h-4 flex items-center text-22;">
                {post && post.title}
                {/* 모달창 관련 코드  
                <div
                  className="flex items-center justify-center w-24 h-24 cursor-pointer"
                  onClick={handleClick}
                >
                  {isUser && (
                    <div className="absolute top-10 right-0 text-2xl" />
                  )}
                </div>
                {isModalOpen && (
                  <PostModal
                    onClose={() => setIsModalOpen(false)}
                    isOpen={isModalOpen}
                  />
                )} */}
              </div>
              <br />
              <div className="createdate">{post && post.createdAt}</div>
            </div>
            <div className=" h-240 flex flex-col items-start p-10 mt-10 border-b-10 border-solid border-black tracking-wide">
              <div className="content" dangerouslySetInnerHTML={{ __html: cleanContent }}></div>
              <>
                <div className=" flex items-center justify-center mt-auto ml-30 pb-10;">
                  <span>
                    {/* <Like
                      onClick={() => {
                        setLike(like + 1);
                      }}
                      style={{ fontSize: "20px" }}
                    /> */}
                  </span>
                  <span style={{ paddingBottom: '40' }}>{like}</span>
                  <span className=" ml-200;">
                    {/* <CommentIcon
                      onChange={() => {
                        setCount(count);
                      }}
                    /> */}
                  </span>
                  <span style={{ paddingBottom: '40', marginLeft: '10px' }}>
                    {count}
                  </span>
                </div>
              </>
            </div>
          </div>
          <button>
            <Link href="/board/">목록</Link>
          </button>
          <br />
          <Link
            href={{
              pathname: '/board/edit',
              query: {
                detail: JSON.stringify(post),
              },
            }}
            as="/board/edit"
          >
            수정
          </Link>
          <br />
          <button
            onClick={() => {
              if (window.confirm('정말로 삭제하시겠습니까?')) {
                onDelete();
                //alert('게시물이 삭제되었습니다😎');
                //window.location.href = '/board';
              }
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardCardDetail;
