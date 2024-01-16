interface postDataType {
  postId: any;
  title: string;
  content: string;
  tag: string;
  date: any;
}

interface PostCardsProps {
  dummyData: postDataType[];
}

interface BoardCreateOrEdit {
  setTitle: any;
  setContent: any;
  title: string;
  content: string;
  handleSubmit: any;
}

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  onClose: any;
  isOpen?: () => void;
}

interface BoardDataType {
  id: any;
  title: string;
  content: string;
  nickName: string;
  viewCount: any;
  likeCount: number;
  commentCount: number;
  createdAt: any;
}

interface boardListProps {
  boardList: BoardDataType[];
}
