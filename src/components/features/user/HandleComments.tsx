import { useUserComment } from '@/src/hooks/api/user';
import { useEffect, useState } from 'react';
import { CommentsProps } from '../../types/CommentTypes';
import Comments from '../comment/Comments';

const HandleComments = () => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<CommentsProps>();
  let limit = 15;
  const getComments = useUserComment(`?page=${page}&limit=${limit}`);

  useEffect(() => {
    if (getComments.data?.data) {
      setComments(getComments.data?.data);
    }
  }, [getComments.data]);

  return (
    <div className="flex justify-center items-center">
      {comments && <Comments count={comments.count} list={comments.list} />}
    </div>
  );
};

export default HandleComments;
