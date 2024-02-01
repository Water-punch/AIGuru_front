import {
  formats,
  modules,
} from '@/src/components/features/board/EditorSetting';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useEditBoard, useHandleImage } from '@/src/hooks/api/board';

interface BoardCardTypeMini {
  post: any;
}

//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001/api';
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const BoardEdit = ({ post }: BoardCardTypeMini) => {
  console.log('post.boardId(BoardEdit) : ', post.boardId);
  console.log('post.title(BoardEdit) : ', post.title);
  console.log('post(BoardEdit) : ', post);
  const router = useRouter();
  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  let newContent = ''
  const imgHook = useHandleImage();
  const boardEdit = useEditBoard();
  const boardId = post.boardId

  const handleEdit = async () => {
    if (typeof window !== 'undefined') {
      const parse = await imgHook.parse(content, title)
      if(parse.filenames) {
        const preUrls = await imgHook.getUrl(parse.filenames)  
        const imgUrls = await imgHook.imgToS3(preUrls, parse.decodedImages)
        if(imgUrls) {
          newContent = imgHook.change(content, imgUrls, parse.base64ImageIndexes)
          setContent(newContent)
          boardEdit.mutate({ title: title, content: newContent, tag: 'love', boardId: boardId})
        }
      }
      else if(!parse) {
        boardEdit.mutate({ title: title, content: content, tag: 'love', boardId: boardId })
      }
    }
  }

  if (boardEdit.isSuccess && boardEdit.data) {
    router.push(`/board/${boardId}`)
  }

  if (boardEdit.error) {
    console.log(boardEdit.error)
  }


  // const handleSubmit = useCallback(
  //   async (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault();
  //     console.log('post(BoardEdit) : ', post);
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
  //       console.log('여기까지 왔나 11111111111111111111111111');
  //       const response = await api.put(`${serverUrl}/boards`, {
  //         //userId: postEdit.userId,

  //         boardId: post.boardId,
  //         title: postEdit.title,
  //         content: postEdit.content,
  //         tag: 'love',
  //       });
  //       if (response.status === 200) {
  //         console.log('여기까지 왔나 222222222222222222222');
  //         window.alert('수정등록이 완료되었습니다😎');
  //         console.log(
  //           `게시글을 작성(수정)했습니다.\n title: ${title}\n, content: ${content}`,
  //         );
  //         console.log(post);
  //         // 글 작성하고 나서 게시판 목록으로 이동
  //         router.push(`/board/${post.boardId}`);
  //         //router.push("/board/[postId]");
  //         //router.push("/board/[" + 1 + "]");
  //         //router.push("/board/[postId]");
  //       } else {
  //         window.alert('수정등록이 실패했습니다.😎');
  //         console.log('여기까지 왔나 000000000000000000000000');
  //         router.push(`/board/${post.boardId}`);
  //       }
  //     } catch (e) {
  //       console.log('여기까지 왔나 99999999999999999999999');
  //       //   toast.error("등록이 실패하였습니다😭", {
  //       //     position: "top-center",
  //       //   });
  //       alert('수정등록이 실패(catch)하였습니다.');
  //     }
  //   },
  //   [title, content],
  // );

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
        value={title}
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
        value={content}
        onChange={e => setContent(e)}
      />
      <button onClick={handleEdit}>수정완료</button>
    </div>
  );
};

export default BoardEdit;
