import BoardEdit from "@/src/components/features/board/BoardEdit";
import BoardWrite from "@/src/components/features/board/BoardWrite";
import { useRouter } from "next/router";
import { useState } from "react";

const BoardWritingPage = () => {
  console.log("PostPage진입");
  const [isEdit, setIsEdit] = useState(false);
  return <div>{isEdit ? <BoardEdit /> : <BoardWrite />}</div>;
};

export default BoardWritingPage;
