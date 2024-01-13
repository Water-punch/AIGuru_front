import Link from 'next/link';

const PostCard = (post : PostDataType) => {
  const { title, date, postId } = post;

  return (
    <Link href={`/board/${postId}`}>
      <div className="flex justify-center min-w-40 min-h-10 bg-[#fde68a] ">
        <div className="w-5/6 bg-white flex flex-col">
          <div>{title}</div>
          <div>{date}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
