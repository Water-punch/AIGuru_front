import styled from "styled-components";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";
import Link from "next/link";
const PostModal = ({ onEdit, onDelete, onClose, isOpen }: Props) => {
  const handlemodalSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClose();
  };

  PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  return (
    <>
      {isOpen && (
        <Container>
          <form onSubmit={handlemodalSubmit}>
            <Button type="submit" onClick={onEdit}>
              수정하기
            </Button>
            <Button
              onClick={() => {
                if (window.confirm("정말로 삭제하시겠습니까?")) {
                  onDelete();
                  alert("게시물이 삭제되었습니다😎");
                  window.location.href = "/PostlistPage";
                }
              }}
            >
              {" "}
              삭제하기{" "}
            </Button>
          </form>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  position: absolute;
  top: 85px;
  right: 0;
  z-index: 1;
  width: 70px;
  background-color: white;
  margin-right: -75px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  border: none;
  background-color: white;
  height: 30px;
  &:hover {
    background-color: #64b5ff;
  }

  &:first-child {
    border-bottom: 1px solid #ccc;
  }
`;
const ButtonLink = styled(Link)`
  text-decoration: none;
`;
export default PostModal;
