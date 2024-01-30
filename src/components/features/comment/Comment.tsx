import { useDeleteComment, useReportComment } from '@/src/hooks/api/comment';
import { CommentProps } from '../../types/CommentTypes';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  const handleReport = async () => {
    console.log(`신고 화면으로 이동!`);
    router.push({
      pathname: `/board/report`,
      query: {
        commentId,
      },
    });
  };

  if (deletedAt) {
    return (
      <div className="bg-red-50 p-4 m-1 border-y-2 border-red-100">
        <p className="text-gray-500 italic">삭제된 댓글입니다</p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 p-4 m-1 border-y-2 border-red-100">
      <div className="flex flex-col gap-3">
        <div className="flex flex gap-3">
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
          <p className="inline-block text-gray-800 font-semibold">{`익명${anonymous_number}`}</p>

          <p className="text-gray-700">{position}</p>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleReport}>신고</button>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default Comment;

//<button onClick={handleSubmit}>신고</button>
