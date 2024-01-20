//import { useNavigate, useParams, Link } from "react-router-dom";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import BoardCreateOrEdit from "../../components/features/board/BoardCreateOrEdit"; //재활용
import styled from "styled-components";
import axios from "axios";
//import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostEditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  // 사용자가 직전에 등록한 게시물의 상태를 그대로 보여주기 위해
  // 컴포넌트가 마운트되고 URI 파라미터에 해당하는 board를 가져와서
  // title, content의 상태를 바꿔줌

  //기존 작성한 게시글 데이터 가져오기
  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/board/integrated/${id}`
      );
      return data;
    };
    getBoard().then((result) => {
      setTitle(result.title);
      setContent(result.content.replace(/<\/?p[^>]*>/g, ""));
    });
  }, []);

  // 게시글 수정 요청
  const canSubmit = useCallback(() => {
    return content !== "" && title !== "";
  }, [title, content]);

  const handleeditSubmit = useCallback(async () => {
    try {
      const modifiedContent = content.replace(/<\/?p[^>]*>/g, "");
      const data = { title, content: modifiedContent, tag: "" };
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/board/integrated/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("😎수정이 완료되었습니다😎");
      navigate(`/PostviewPage/${id}`);
    } catch (e) {
      toast.error("오류가 발생했습니다!😭", {
        position: "top-center",
      });
    }
  }, [canSubmit]);

  return (
    <>
      <div className="titlediv">
        <p>수정하기</p>
      </div>
      <BoardCreateOrEdit
        setTitle={setTitle}
        setContent={setContent}
        title={title}
        content={content.replace(/<\/?p[^>]*>/g, "")}
        handleSubmit={handleeditSubmit}
      />
      <ButtonContainer>
        <BoardButtonLink to="/PostlistPage">
          <BoardButton className="delete"> 취소 </BoardButton>
        </BoardButtonLink>
        <BoardButtonLink to="/PostviewPage">
          <BoardButton
            type="submit"
            className="submit"
            onClick={handleeditSubmit}
            disabled={!canSubmit()}
          >
            등록
          </BoardButton>
        </BoardButtonLink>
      </ButtonContainer>
    </>
  );
};
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
export default PostEditPage;
