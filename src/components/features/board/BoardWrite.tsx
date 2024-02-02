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
import { useHandleImage, useWriteBoard } from '@/src/hooks/api/board';


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

  return (
    <div>
      <div>글쓰기</div>

      <input
        style={{
          width: '700px',
          height: '35px',
          marginTop: '20px',
          paddingLeft: '10px',
        }}
        type="text"
        placeholder="제목을 입력하세요"
        onChange={e => setTitle(e.target.value)}
      />
      <select onChange={e => setTag(e.target.value)}>
        <option value="free">일상고민</option>
        <option value="divorce">이혼</option>
        <option value="love" selected>
          사랑
        </option>
        <option value="marriage">결혼</option>
      </select>
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
      <button onClick={handleWrite}>완료</button>
      <br />
      <Link href="/board/">
        <button>취소</button>
      </Link>
    </div>
  );
};

export default BoardWrite;
