import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";

const limit = 15

const MyPage = () => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.user)
  const [commentPage, setCommentPage] = useState(1)
  const [boardPage, setboardPage] = useState(1)
  const commentQuery = `?page=${commentPage}&limit=${limit}`
  const boardQuery = `?page=${boardPage}&limit=${limit}`

  const handleSwitch = () => {

  }
  
  return (
    <div>
      <div>
        <div>{user.userId} 임시로 보여주는 userId</div>
        <div className="flex flex-col gap-5 w-20">
          {/* <button className="border border-black" onClick={}>댓글 모아보기</button>
          <button className="border border-black" onClick={}>작성한 글 관리하기</button> */}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
