import { CommentProps, CommentType } from "../../types/CommentTypes";

//댓글 하나 출력
const Comment = (commentData : CommentProps) => {
  const { boardId, content, anonymous_number } = commentData;

  return (
    <div>
      <div className="bg-gray-100 rounded-md">
        <p className="text-gray-800 font-semibold">{`익명`+anonymous_number}</p>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>

  );
};

export default Comment;
