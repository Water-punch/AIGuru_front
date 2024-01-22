import {
  formats,
  modules,
} from '@/src/components/features/board/EditorSetting';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface BoardCardTypeMini {
  post: any;
}

//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001/api';
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

const BoardEdit = ({ post }: BoardCardTypeMini) => {
  console.log('post.boardId(BoardEdit) : ', post.boardId);
  console.log('post.title(BoardEdit) : ', post.title);
  console.log('post(BoardEdit) : ', post);
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const userId = localStorage.getItem('userId');
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const createdAt = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  // 시간이 -9시간으로 떠서 추가해주었지만 반영되지않았다.
  const postEdit = {
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
        const response = await axios.put(`${serverUrl}/boards`, {
          userId: postEdit.userId,
          boardId: post.boardId,
          title: postEdit.title,
          content: postEdit.content,
          tag: '',
        });
        if (response.status === 201) {
          window.alert('수정등록이 완료되었습니다😎');
          console.log(
            `게시글을 작성했습니다.\n title: ${title}\n, content: ${content}`,
          );
          console.log(post);
          // 글 작성하고 나서 게시판 목록으로 이동
          router.push('/board/${post.boardId}');
          //router.push("/board/[postId]");
          //router.push("/board/[" + 1 + "]");
          //router.push("/board/[postId]");
        }
      } catch (e) {
        //   toast.error("등록이 실패하였습니다😭", {
        //     position: "top-center",
        //   });
        alert('수정등록이 실패하였습니다.');
      }
    },
    [title, content],
  );

  return (
    <div>
      <div>게시글 수정 페이지</div>
      <input
        type="text"
        style={{
          width: '700px',
          height: '35px',
          marginTop: '20px',
          paddingLeft: '10px',
        }}
        placeholder="제목을 입력하세요"
        value={post.title}
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
        formats={formats}
        value={post.content}
        onChange={e => setContent(e)}
      />
      <button onClick={handleSubmit}>수정완료</button>
    </div>
  );
};

export default BoardEdit;
