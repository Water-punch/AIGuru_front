import Link from 'next/link';

const PostCard = (props: BoardDataType) => {
  //const { title, date, postId } = post;
  const { title, createdAt, boardId } = props;
  return (
    <Link href={`/board/${boardId}`}>
      <div className="flex justify-center min-w-40 min-h-10 bg-[#fde68a] ">
        <div className="w-5/6 bg-white flex flex-col">
          <div>{title}</div>
          <div>{createdAt}</div>
          <div>{boardId}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
