import BoardCreateOrEdit from "../../components/features/board/BoardCreateOrEdit";
import styled from "styled-components";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import axios from "axios";
//import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
import Link from "next/link";
const PostPage = () => {
  // 게시판 제목, 내용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const createdAt = now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  // 시간이 -9시간으로 떠서 추가해주었지만 반영되지않았다.

  const post = {
    userId: userId,
    title: title,
    content: content.replace(/<\/?p[^>]*>/g, ""),
    //content가 <p> 감싸져서 나오는 것 없애기위해 추가해주었다.
    createdAt: createdAt,
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // 게시물의 제목, 내용 중 하나라도 입력을 안하면 제출할 수 없도록 막고
      //	DB에 성공적으로 데이터가 반영이 되면 url을 /PostlistPage로 이동한다. //
      if (title === "" || title === null || title === undefined) {
        alert("제목을 작성하십시오.");
        return false;
      }
      if (content === "" || content === null || content === undefined) {
        alert("내용을 작성하십시오.");
        return false;
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/board/integrated`,
          {
            userId: post.userId,
            title: post.title,
            content: post.content,
            tag: "",
          }
        );

        if (response.status === 201) {
          window.alert("등록이 완료되었습니다😎");
          //navigate("/PostlistPage");
          // 데이터 요청 성공 시 알림창과 페이지 이동 navigate 구현 //
          console.log(post);
        }
      } catch (e) {
        // toast.error("등록이 실패하였습니다😭", {
        //   position: "top-center",
        // });
      }
    },
    [title, content]
  );

  return (
    <PostWrapper>
      <div className="titlediv">
        <p>글쓰기</p>
      </div>
      <BoardCreateOrEdit
        setTitle={setTitle}
        setContent={setContent}
        title={title}
        content={content}
        handleSubmit={handleSubmit}
      />
      <ButtonContainer>
        <BoardButtonLink to="./PostlistPage">
          <BoardButton className="delete"> 취소 </BoardButton>
        </BoardButtonLink>
        <BoardButtonLink to="./PostviewPage">
          <BoardButton type="submit" className="submit" onClick={handleSubmit}>
            등록
          </BoardButton>
        </BoardButtonLink>
      </ButtonContainer>
    </PostWrapper>
  );
};
/**/
const PostWrapper = styled.div`
  @media only screen and (min-width: 1441px) {
    //해상도 1440보다 큰 모니터
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 90vh;
    font-size: 40px;
    gap: 10px;
    margin-top: -30px;
  }
  @media only screen and (max-width: 1440px) {
    height: 800px;
    font-size: 20px;
  }
  .titlediv {
    font-size: 40px;
    font-weight: 600;
    margin-top: 70px;
    margin-bottom: 20px;
  }
`;
// 팀원들 마다 모니터의 해상도가 달라 미디어 쿼리 사용하여 반응형 페이지를 만들어주었다. //

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 600px;
  width: 220px;
  margin-top: -30px;
  @media only screen and (max-width: 1440px) {
    margin-top: -250px;
  }
`;
const BoardButtonLink = styled(Link)`
  text-decoration: none;
`;
const BoardButton = styled.button`
  width: 106px;
  height: 54px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  border-radius: 10px;
  border: 0;
  letter-spacing: 7px;
  text-decoration: none;
  &.delete {
    background-color: #a1a1a1;
  }
  &.submit {
    background-color: #64b5ff;
  }
`;

export default PostPage;
