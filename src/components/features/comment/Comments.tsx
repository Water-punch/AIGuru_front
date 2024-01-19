import Link from "next/link";
import { CommentProps, CommentsProps } from "../../types/CommentTypes";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useWriteComment } from "@/src/hooks/api/comment";

const Comments = ({ commentsData }: CommentsProps) => {
  const [userInput, setUserInput] = useState("");
  const writeComment = useWriteComment({
    boardId: 1,
    content: userInput,
    anonymous_number: 10,
  });

  const handleSubmit = async () => {
    writeComment.mutate();
  };

  useEffect(() => {
    //get
  }, [commentsData]);

  return (
    <div className="flex flex-col gap-5">
      {commentsData.map((data: CommentProps, idx: number) => (
        <Comment key={idx} {...data} />
      ))}

      <div className="flex flex-row">
        <input
          type="text"
          placeholder="댓글을 입력해 주세요"
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>작성</button>
      </div>
    </div>
  );
};

export default Comments;
