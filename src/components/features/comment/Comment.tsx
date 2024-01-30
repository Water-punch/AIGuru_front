import { useDeleteComment } from '@/src/hooks/api/comment';
import { CommentProps } from '../../types/CommentTypes';

//댓글 하나 출력
const Comment = (commentData: CommentProps) => {
  const {
    content,
    anonymous_number,
    position,
    status,
    createdAt,
    deletedAt,
    commentId,
  } = commentData;

  const deleteComment = useDeleteComment(commentId);

  const handleDelete = async () => {
    deleteComment.mutate(commentId);
    if (deleteComment.isSuccess && deleteComment.data) {
      console.log('댓글 삭제 성공');
    }
  };

  if (deletedAt) {
    return (
      <div className="bg-white p-4 m-1 border-y-2 border-red-300">
        <p className="text-gray-500 italic">삭제된 댓글입니다</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 m-2 rounded-md border-b-2 border-black">
      <div className="flex flex-row gap-3">
        {position && position == 'positive' && (
          <img
            src="/images/happy.png"
            className="rounded-full h-[26px] w-[26px]"
          ></img>
        )}
        {position && position == 'negative' && (
          <img
            src="/images/angry.png"
            className="rounded-full h-[26px] w-[26px]"
          ></img>
        )}
        <p className="text-gray-800 font-semibold">{`익명${anonymous_number}`}</p>
        <p className="text-gray-700">{content}</p>
        <p className="text-gray-700">{position}</p>
      </div>
    </div>
  );
};

export default Comment;

// 삭제한 댓글에는 삭제버튼이 안보이도록.
// 댓글 삭제시 상태 바로 반영(리로드)
// 삭제시 익명 없어지게

//<button onClick={handleSubmit}>신고</button>
