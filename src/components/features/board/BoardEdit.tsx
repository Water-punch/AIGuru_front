import {
  formats,
  modules,
} from '@/src/components/features/board/EditorSetting';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface BoardCardTypeMini {
  post: any;
}
const BoardEdit = ({ post }: BoardCardTypeMini) => {
  console.log('post.boardId(BoardEdit) : ', post.boardId);
  console.log('post.title(BoardEdit) : ', post.title);
  console.log('post(BoardEdit) : ', post);
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    // post 요청 코드
    // axios ...
    console.log(
      `게시글을 작성했습니다.\n title: ${title}\n, content: ${content}`,
    );

    // 글 작성하고 나서 상세페이지로 이동
    // router.push('/board/[postId]');
  };

  return (
    <div>
      <div>BoardEdit</div>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={post.boardId}
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
        value={post}
        onChange={e => setContent(e)}
      />
      <button onClick={handleSubmit}>수정완료</button>
    </div>
  );
};

export default BoardEdit;
