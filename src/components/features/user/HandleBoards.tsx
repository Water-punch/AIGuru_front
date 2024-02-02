import { useUserBoadrd } from '@/src/hooks/api/user';
import { useEffect, useState } from 'react';
import PostCards from '../board/PostCards';

const HandleBoards = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<BoardDataTypeList>();
  let limit = 15;
  const getPosts = useUserBoadrd(`?page=${page}&limit=${limit}`);

  useEffect(() => {
    if (getPosts.data?.data) {
      setPosts(getPosts.data?.data);
    }
  }, [getPosts.data]);

  return (
    <div className="flex justify-center items-center">
      {posts && <PostCards count={posts.count} list={posts.list} />}
    </div>
  );
};

export default HandleBoards;
