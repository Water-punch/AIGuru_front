import BoardCardDetail from '../../components/features/board/BoardCardDetail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Comments from '@/src/components/features/comment/Comments';
import { useBoardComment } from '@/src/hooks/api/comment';

//백엔드 통신 관련 임시코드
import axios from 'axios';
const serverUrl = 'http://localhost:5001/api';
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

const PostviewPage = () => {
  const router = useRouter();
  const postId = router.query.postId;
  console.log(postId)
  const [comments, setComments] = useState({count:0, list: []});
  const [post, setPost] = useState({});
  // 게시글이 없으면 isLoaded되지 않도록
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1)
  const limit = 15
  const commentQuery = `?$page=${page}&limit=${limit}`
  const boardComment = useBoardComment(postId, commentQuery);

  useEffect(() => {
    setComments(boardComment.data.data)
    console.log(boardComment.data)
  }, [comments]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/boards/${postId}`);
        console.log(data);
        setPost(data);
        setIsLoaded(true);
      } catch (error) {
        console.log('getPost error');
        console.log(error);
      }
    };
    getPost();
  }, [postId]);
  
  return (
    <div>
      <BoardCardDetail
        id={postId}
        post={post}
        setPost={setPost}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        handleEdit={isLoaded}
        handleDelete={isLoaded}
      />
      <Comments count={comments.count} list={comments.list} />
    </div>
  );
};
export default PostviewPage;
