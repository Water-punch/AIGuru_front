//import { Link } from "react-router-dom";
import Link from "next/link";
import styled from "styled-components";
const BoardCard = ({
  idx,
  id,
  title,
  content,
  nickName,
  viewCount,
  likeCount,
  commentCount,
  createdAt,
}: BoardDataType) => {
  const CardLayout = styled(Link)`
    display: flex;
    width: 908px;
    height: 111px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    margin-top: 14px;
    text-decoration: none;
  `;
  return (
    <div>
      <CardLayout>
        <CardLink to={`/PostViewPage/${id}`}>
          {" "}
          {/* 해당 게시글로 이동 */}
          <div className="posttitle"> {title} </div>
          <div className="postcontent">
            <span className="content">{content}</span>
            <span className="username" style={{ marginLeft: "auto" }}>
              {nickName}
            </span>
          </div>
          <div className="cardbottom">
            <span className="viewCount">
              {/* <AiFillEye size="15px" /> */}
              <span className="view">{viewCount}</span>
            </span>
            <span className="likeCount">
              {/* <AiFillHeart size="14px" /> */}
              <span className="like"> {likeCount}</span>
            </span>
            <span className="commentCount">
              {/* <FaCommentAlt size="11px" /> */}
              <span className="cmt"> {commentCount}</span>
            </span>
            <span className="createdAt" style={{ marginLeft: "auto" }}>
              {createdAt}
            </span>
          </div>
        </CardLink>
      </CardLayout>
    </div>
  );
};
export default BoardCard;
