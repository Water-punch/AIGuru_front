import {
  formats,
  modules,
} from '@/src/components/features/board/EditorSetting';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';
import styled from 'styled-components';

//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001';
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

const BoardWrite = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const userId = localStorage.getItem('userId');
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const createdAt = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  // 시간이 -9시간으로 떠서 추가해주었지만 반영되지않았다.
  const post = {
    userId: userId,
    title: title,
    content: content.replace(/<\/?p[^>]*>/g, ''),
    //content가 <p> 감싸져서 나오는 것 없애기위해 추가해주었다.
    createdAt: createdAt,
  };

  const handleSubmit = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      // 게시물의 제목, 내용 중 하나라도 입력을 안하면 제출할 수 없도록 막고
      //DB에 성공적으로 데이터가 반영이 되면 url을 /PostlistPage로 이동한다. //
      if (title === '' || title === null || title === undefined) {
        alert('제목을 작성하십시오.');
        return false;
      }
      if (content === '' || content === null || content === undefined) {
        alert('내용을 작성하십시오.');
        return false;
      }
      // post 요청 코드
      // axios ...
      try {
        const response = await axios.post(`${serverUrl}/api/boards`, {
          userId: post.userId,
          title: post.title,
          content: post.content,
          tag: '',
        });
        if (response.status === 201) {
          window.alert('등록이 완료되었습니다😎');
          console.log(
            `게시글을 작성했습니다.\n title: ${title}\n, content: ${content}`,
          );
          console.log(post);
          // 글 작성하고 나서 게시판 목록으로 이동
          router.push('/board/');
          //router.push("/board/[postId]");
          //router.push("/board/[" + 1 + "]");
          //router.push("/board/[postId]");
        }
      } catch (e) {
        //   toast.error("등록이 실패하였습니다😭", {
        //     position: "top-center",
        //   });
        alert('등록이 실패하였습니다.');
      }
    },
    [title, content],
  );
  return (
    <PostWrapper>
      <div>글쓰기</div>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        onChange={e => setTitle(e.target.value)}
      />
      <ReactQuill
        style={{
          width: '82%',
          height: '60vh',
          marginBottom: '5vh',
          marginTop: '2.5vh',
        }}
        theme="snow"
        modules={modules}
        placeholder="내용을 입력해주세요."
        formats={formats}
        value={content}
        onChange={e => setContent(e)}
      />
      {/* <button onClick={handleSubmit}>완료</button> */}
      <ButtonContainer>
        <Link href="/board/">
          <BoardButton className="delete"> 취소 </BoardButton>
        </Link>
        {/* <Link href="/PostviewPage"> */}
        <BoardButton type="submit" className="submit" onClick={handleSubmit}>
          등록
        </BoardButton>
        {/* </Link> */}
      </ButtonContainer>
    </PostWrapper>
  );
};
const PostWrapper = styled.div`
  @media only screen and (min-width: 1441px) {
    //해상도 1440보다 큰 모니터
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90vh;
    font-size: 40px;
    gap: 10px;
    margin-top: -30px;
  }
  @media only screen and (max-width: 1440px) {
    height: 800px;
    font-size: 20px;
  }
  .titlediv {
    font-size: 40px;
    font-weight: 600;
    margin-top: 70px;
    margin-bottom: 20px;
  }
`;
// 팀원들 마다 모니터의 해상도가 달라 미디어 쿼리 사용하여 반응형 페이지를 만들어주었다. //

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 600px;
  width: 220px;
  margin-top: 30px;
  @media only screen and (max-width: 1440px) {
    margin-top: -250px;
  }
`;
const BoardButtonLink = styled(Link)`
  text-decoration: none;
`;
const BoardButton = styled.button`
  width: 106px;
  height: 54px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  border-radius: 10px;
  border: 0;
  letter-spacing: 7px;
  text-decoration: none;
  &.delete {
    background-color: #a1a1a1;
  }
  &.submit {
    background-color: #64b5ff;
  }
`;
export default BoardWrite;
