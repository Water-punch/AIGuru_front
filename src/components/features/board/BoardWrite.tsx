import { formats, modules } from '@/src/components/features/board/EditorSetting';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const BoardWrite = () => {
  const router = useRouter();
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = () => {
    // post 요청 코드
    // axios ...
    console.log(`게시글을 작성했습니다.\n title: ${title}\n, content: ${content}`)

    // 글 작성하고 나서 상세페이지로 이동
    // router.push('/board/[postId]');
  };

  return (
    <div>
      <div>BoardWrite</div>
      <input type='text' placeholder='제목을 입력하세요' onChange={e=> setTitle(e.target.value)} />
      <ReactQuill
        style={{ width: '82%', height: '60vh', marginBottom: '5vh', marginTop: '2.5vh' }}
        theme='snow'
        modules={modules}
        formats={formats}
        value={content}
        onChange={e=> setContent(e)}
        />
      <button onClick={handleSubmit}>완료</button>
    </div>
  );
};

export default BoardWrite;
