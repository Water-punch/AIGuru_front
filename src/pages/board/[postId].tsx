import BoardCardDetail from '../../components/features/board/BoardCardDetail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
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
  console.log(postId);
  const [comments, setComments] = useState({ count: 0, list: [] });
  const [post, setPost] = useState<BoardDataType>();

  //ㄹ그인여부 본인게시글
  const userState = useSelector((state: RootState) => state.user.user);

  // 게시글이 없으면 isLoaded되지 않도록
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 15;
  const commentQuery = `?$page=${page}&limit=${limit}`;
  const boardComment = useBoardComment(postId, commentQuery);

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

  useEffect(() => {
    if (postId) {
      boardComment.executeQuery();
      setComments(boardComment.data?.data);
      console.log(comments);
    }
    if (boardComment.data) {
      console.log('댓글 요청 성공');
    }
  }, [postId, page, boardComment]);

  useEffect(() => {
    getPost();
  }, [postId]);

  const hasComments =
    comments && comments.count !== undefined && comments.list !== undefined;

  if (post && userState) {
    console.log(
      '로그인한 유저와 작성자 id 일치 확인',
      userState.userId === post.userId,
    );
  }

  return (
    <div className="flex flex-col">
      <div>{post && <BoardCardDetail id={postId} post={post} />}</div>
      <div>
        {hasComments && (
          <Comments count={comments.count} list={comments.list} />
        )}
        <CommentInput />
      </div>
    </div>
  );
};
export default PostviewPage;
