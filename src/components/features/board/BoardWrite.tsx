import {
  formats,
  modules,
} from '@/src/components/features/board/EditorSetting';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';

//백엔드 통신 관련 임시코드
import axios from 'axios';
import { useHandleImage, useWriteBoard } from '@/src/hooks/api/board';
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
  //태그속성추가
  const [tag, setTag] = useState('love');
  let newContent = '';
  // content에서 이미지의 src를 추출 및 디코딩하는 커스텀훅
  const imgHook = useHandleImage();

  const boardWrite = useWriteBoard();

  console.log(content);

  const handleWrite = async () => {
    if (typeof window !== 'undefined') {
      const parse = await imgHook.parse(content, title);
      console.log(parse.filenames);
      if (parse.filenames) {
        const preUrls = await imgHook.getUrl(parse.filenames);
        console.log(preUrls);
        const imgUrls = await imgHook.imgToS3(preUrls, parse.decodedImages);
        console.log(imgUrls);
        if (imgUrls) {
          newContent = imgHook.change(
            content,
            imgUrls,
            parse.base64ImageIndexes,
          );
          console.log(newContent);
          boardWrite.mutate({ title: title, content: newContent, tag: tag });
        }
      } else {
        boardWrite.mutate({ title: title, content: content, tag: tag });
      }
    }
    //boardWrite.mutate({ title: title, content: content, tag: tag });
  };

  if (boardWrite.isSuccess && boardWrite.data) {
    const response = boardWrite.data.data;
    const boardId = response.boardId;
    router.push(`/board/${boardId}`);
  }

  if (boardWrite.error) {
    console.log(boardWrite.error);
  }

  // const handleSubmit = useCallback(
  //   async (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault();
  //     // 게시물의 제목, 내용 중 하나라도 입력을 안하면 제출할 수 없도록 막고
  //     //DB에 성공적으로 데이터가 반영이 되면 url을 /PostlistPage로 이동한다. //
  //     if (title === '' || title === null || title === undefined) {
  //       alert('제목을 작성하십시오.');
  //       return false;
  //     }
  //     if (content === '' || content === null || content === undefined) {
  //       alert('내용을 작성하십시오.');
  //       return false;
  //     }
  //     // post 요청 코드
  //     // axios ...
  //     try {
  //       const response = await axios.post(`${serverUrl}/api/boards`, {
  //         // userId: post.userId,
  //         title: post.title,
  //         content: post.content,
  //         tag: '',
  //       });
  //       if (response.status === 201) {
  //         window.alert('등록이 완료되었습니다😎');
  //         console.log(
  //           `게시글을 작성했습니다.\n title: ${title}\n, content: ${content}`,
  //         );
  //         console.log(post);
  //         // 글 작성하고 나서 게시판 목록으로 이동
  //         router.push('/board/');
  //         //router.push("/board/[postId]");
  //         //router.push("/board/[" + 1 + "]");
  //         //router.push("/board/[postId]");
  //       }
  //     } catch (e) {
  //       //   toast.error("등록이 실패하였습니다😭", {
  //       //     position: "top-center",
  //       //   });
  //       alert('등록이 실패하였습니다.');
  //     }
  //   },
  //   [title, content],
  // );

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="text-3xl font-bold mb-6 mt-20">글쓰기</div>
      <input
        className="flex justify-start w-4/5 h-[6vh] mt-10 mb-4 px-4 border border-gray-300 rounded"
        type="text"
        placeholder="제목을 입력하세요"
        onChange={e => setTitle(e.target.value)}
      />
      <select
        className="flex justify-end w-36 h-10 px-4 mr-24 border border-gray-300 rounded"
        onChange={e => setTag(e.target.value)}
      >
        <option value="free">일상고민</option>
        <option value="divorce">이혼</option>
        <option value="love" selected>
          사랑
        </option>
        <option value="marriage">결혼</option>
      </select>
      <ReactQuill
        className="w-[82%] h-[60vh] mb-20 mt-5"
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={e => setContent(e)}
      />
      <div className="flex flex-row">
        <button
          className="w-20 h-10 mr-10 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleWrite}
        >
          게시
        </button>
        <br />
        <Link href="/board/">
          <button className="w-20 h-10  bg-gray-300 rounded hover:bg-gray-400">
            취소
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BoardWrite;
