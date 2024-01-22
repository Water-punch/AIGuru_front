interface PostDataType {
  postId: any;
  title: string;
  content: string;
  tag: string;
  date: any;
}

interface PostCardsProps {
  dummyData: BoardDataTypeList;
}

interface BoardDataTypeList {
  count: number;
  list: BoardDataType[];
  // boardId: any;
  // id: any;
  // title: string;
  // content: string;
  // nickName: string;
  // viewCount: any;
  // likeCount: number;
  // commentCount: number;
  // createdAt: any;
}

interface BoardDataType {
  boardId: any;
  //id: any;
  title: string;
  tag: string;
  //content: string;
  //nickName: string;
  views: any;
  //likeCount: number;
  //commentCount: number;
  createdAt: any;
  updatedAt: any;
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

interface boardListProps {
  boardList: BoardDataType[];
}
