import BoardCardDetail from '../../components/features/board/BoardCardDetail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Comments from '@/src/components/features/comment/Comments';
import { useBoardComment } from '@/src/hooks/api/comment';

//백엔드 통신 관련 임시코드
import axios from 'axios';
import CommentInput from '@/src/components/features/comment/CommentInput';
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
  const boardComment = useBoardComment(postId, commentQuery)

  useEffect(() => {
    if (postId) {
      boardComment.executeQuery()
      setComments(boardComment.data?.data)
      console.log(comments)
    }
    if (boardComment.data) {
      console.log('댓글 요청 성공')
    }
  }, [postId, page, boardComment]);

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
  
  const hasComments = comments && comments.count !== undefined && comments.list !== undefined;

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
      {hasComments&& <Comments count={comments.count} list={comments.list} /> }
      <CommentInput />
    </div>
  );
};
export default PostviewPage;
