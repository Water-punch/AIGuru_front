import BoardCardDetail from "../../components/features/board/BoardCardDetail";
// import PostCard from "../../components/features/board/PostCard";
//import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
//import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
//백엔드 통신 관련 임시코드
import axios from "axios";
const serverUrl = "http://localhost:5001/api";
const api = axios.create({
  baseURL: serverUrl,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

const PostviewPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const id = 10;
  const [post, setPost] = useState({});
  // 게시글이 없으면 isLoaded되지 않도록
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/boards/${postId}`);
        console.log(data);
        setPost(data);
        setIsLoaded(true);
      } catch (error) {
        console.log("getPost error");
        console.log(error);
      }
    };
    getPost();
  }, [postId]);
  ////////게시글 삭제
  // const handleDelete = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_API_URL}/board/integrated/${id}`,
  //       config
  //     );
  //     navigate('/PostlistPage');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  ////////게시글 수정
  // const handleEdit = async () => {
  //   navigate(`/PostEditPage/${id}`, {
  //     state: { title: post.title, content: post.content },
  //   });
  // };
  return (
    <BoardCardDetail
      id={postId}
      post={post}

      //isLoaded ={isLoaded}
      //setIsLoaded={setIsLoaded}
    />
  );
};
export default PostviewPage;
