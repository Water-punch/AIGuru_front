import { CommentProps } from '../../types/CommentTypes';

//댓글 하나 출력
const Comment = (commentData: CommentProps) => {
  const { content, anonymous_number, position, status, createdAt, deletedAt } = commentData;

  return (
    <div className="bg-gray-100 p-4 m-2 rounded-md border-b-2 border-black">
      <div className='flex flex-row gap-3'>
        <p className="text-gray-800 font-semibold">{`익명${anonymous_number}`}</p>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
