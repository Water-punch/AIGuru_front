import { CommentProps, CommentsProps } from '../../types/CommentTypes';

import Comment from './Comment';
import { useEffect, useState } from 'react';
import Pagination from './CommentPagination';

const Comments = ({ count, list }: CommentsProps) => {
  const commentsData = list;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  useEffect(() => {}, [currentPage]);

  return (
    <div>
      <div className="flex flex-col">
        {commentsData.map((data: CommentProps, idx: number) => (
          <div key={idx}>
            <Comment {...data} />
          </div>
        ))}
      </div>
      <Pagination
        totalContents={count}
        contentsPerPage={1}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Comments;
