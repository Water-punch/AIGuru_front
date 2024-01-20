interface postDataType {
  postId: any;
  title: string;
  content: string;
  tag: string;
  date: any;
}

interface PostCardsProps {
  dummyData: BoardDataType[];
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
  //onDelete?: () => void;
  onDelete: any;
  onClose: any;
  isOpen: any;
  //isOpen?: () => void;
}

interface BoardDataType {
  boardId: any;
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

interface BoardCardType {
  id: any;
  post: any;
  setPost: any;
  isLoaded: boolean;
  setIsLoaded: any;
  handleEdit: any;
  handleDelete: any;
}
