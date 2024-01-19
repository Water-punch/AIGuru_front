import React, { useState } from "react";

interface CommentInputProps {
  onAddComment: (username: string, content: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ onAddComment }) => {
  const [userName] = useState("익명");
  const [content, setContent] = useState("");
  const [feedComments, setFeedComments] = useState([]);
  // const [isValid, setIsValid] = useState(false);

  const handleAddComment = () => {
    if (userName.trim() !== "" && content.trim() !== "") {
      onAddComment(userName, content);
      setContent("");
    }
  };

  // '게시' 클릭 시 발생하는 함수 post
  const post = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    const copyFeedComments = [...feedComments];
    copyFeedComments.push(content);
    setFeedComments(copyFeedComments);
    setComment("");
  };

  // // 댓글 입력 창
  // <input
  //   type="text"
  //   className="inputComment"
  //   placeholder="댓글을 입력하세요"
  //   onChange={(e) => {
  //     setComment(e.target.value);
  //   }}
  //   onKeyUp={(e) => {
  //     e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
  //   }}
  //   value={comment}
  // />;

  // 게시버튼
  // <button
  //   type="button"
  //   className={
  //     comment.length > 0 ? "submitCommentActive" : "submitCommentInactive"
  //   }
  //   onClick={post}
  //   disabled={isValid ? false : true}
  // >
  //   댓글 달기
  // </button>;

  // // 댓글 목록
  // {
  //   feedComments.map((commentArr, i) => {
  //     return <commentList userName={userName} userComment={commentArr} key={i} />;
  //   });
  // }

  // // 반복적으로 들어갈 댓글 요소들을 컴포넌트화
  // const commentList = (props) => {
  //   return (
  //     <div className="userCommentBox">
  //       <p className="userName">{props.userName}</p>
  //       <div className="userComment">{props.userComment}</div>
  //     </div>
  //   );
  // };

  return (
    <div className="bg-gray-200 p-4 mt-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">댓글쓰기</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 mb-2"
        value={userName}
      />
      <textarea
        placeholder="댓글을 작성해주세요"
        className="w-full p-2 mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleAddComment}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;
