import BoardCardDetail from '../../components/features/board/BoardCardDetail';
// import PostCard from "../../components/features/board/PostCard";
//import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from 'next/router';
//import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Comments from '@/src/components/features/comment/Comments';

//백엔드 통신 관련 임시코드
import axios from 'axios';
import { useBoardComment } from '@/src/hooks/api/comment';
const serverUrl = 'http://localhost:5001/api';
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

const PostviewPage = () => {
  const router = useRouter();
  const postId = router.query.postId;
  const boardComment = useBoardComment(postId);
  const [post, setPost] = useState({});
  // 게시글이 없으면 isLoaded되지 않도록
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    boardComment;
  }, []);

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
      <Comments commentsData={[]} />
    </div>
  );
};
export default PostviewPage;
