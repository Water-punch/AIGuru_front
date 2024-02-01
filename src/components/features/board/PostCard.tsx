import Link from 'next/link';
import { useRouter } from 'next/router';
const PostCard = (props: BoardDataType) => {
  //const { title, date, postId } = post;
  const { title, createdAt, boardId, tag } = props;

  //게시글 신고 관련
  const router = useRouter();
  const handleReport = async () => {
    console.log(`신고 화면으로 이동!`);
    router.push({
      pathname: `/board/report`,
      query: {
        boardId,
      },
    });
  };
  return (
    <>
      <Link href={`/board/${boardId}`}>
        <div className="flex justify-center min-w-40 min-h-10 bg-[#fde68a] ">
          <div className="w-5/6 bg-white flex flex-col">
            <div>{title}</div>
            <div>{createdAt}</div>
            <div>{tag}</div>
          </div>
        </div>
      </Link>
      {/* <button onClick={handleReport}>신고</button> */}
    </>
  );
};

export default PostCard;
