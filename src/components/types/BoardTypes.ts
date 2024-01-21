interface PostDataType {
  postId: any;
  title: string;
  content: string;
  tag: string;
  date: any;
}

interface PostCardsProps {
  dummyData: BoardDataType[];
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

interface BoardCardType {
  id: any;
  post: any;
  setPost: any;
  isLoaded: boolean;
  setIsLoaded: any;
  handleEdit: any;
  handleDelete: any;
}
