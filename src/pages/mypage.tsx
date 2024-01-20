import { useEffect } from "react";
import { useReadComments } from "../hooks/api/comment";

const MyPage = () => {

  const readComments = useReadComments()
  console.log(readComments.data)
  
  return (
    <div>
      MyPage
      <div className="flex flex-col gap-5 w-20">
        <div className="border border-black">댓글 모아보기</div>
        <div className="border border-black">작성한 글 관리하기</div>
      </div>
    </div>
  );
};

export default MyPage;
