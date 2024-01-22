//댓글 하나 출력
const Comment = (commentData: CommentProps) => {
  const { content, anonymous_number } = commentData;

  return (
    <div className="bg-gray-100 p-4 m-2 rounded-md">
      <p className="text-gray-800 font-semibold">{`익명` + anonymous_number}</p>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Comment;
