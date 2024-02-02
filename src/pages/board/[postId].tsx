import BoardCardDetail from '../../components/features/board/BoardCardDetail';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import Comments from '@/src/components/features/comment/Comments';
import { useBoardComment } from '@/src/hooks/api/comment';

//백엔드 통신 관련 임시코드
import axios from 'axios';
import CommentInput from '@/src/components/features/comment/CommentInput';
import withAuth from '@/src/hocs/withAuth';
import CommentAnalysis from '@/src/components/features/comment/CommentAnalysis';
//댓글 페이지네이션 추가용 모듈 import
import Pagination from '../../components/features/comment/CommentPagination';

const serverUrl = 'http://localhost:5001/api';
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
};
const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

const PostviewPage = () => {
  //댓글새로고침클릭
  const [isRefresh, setIsRefresh] = useState(false);
  const isClick = () => {
    setIsRefresh(true);
  };
  //댓글 페이지 값 관리
  const router = useRouter();
  const commentpage = Number(router.query.page);
  console.log('router.query : ', router.query);
  console.log('commentpage(router.query) : ', commentpage);
  const [currentPage, setCurrentPage] = useState(1);
  const commentPaginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //const router = useRouter();
  console.log('router.query 222222222222222222: ', router.query);
  const postId = router.query.postId;
  console.log('postId : ', postId);

  useEffect(() => {
    console.log('useEffect(commentpage) 22222222222222222: ', commentpage);
    // 페이지 변경 시
    if (!commentpage) return;
    console.log('useEffect(commentpage) 33333333333333333333: ', commentpage);
    setCurrentPage(Number(commentpage)); // 현재 페이지 상태 변경 -> Pagination리렌더링
    console.log('setCurrentPage(useEffect) :  ', commentpage);
    getCommentList();
    //boardComment;
    console.log('getCommentList(useEffect) :  ', commentpage);
    //getBoardlist(searchKeyword); // 컨텐츠 데이터 새롭게 불러와 상태 변경 -> ProductList리렌더링
    // console.log('==================댓글 페이지 변경 발생==================');
    // if (boardComment.error) {
    //   console.log(boardComment.error);
    // }
    // console.log('==================댓글 페이지 변경 발생==================');
  }, [commentpage]);

  const [comments, setComments] = useState({
    count: 0,
    list: [],
    positiveCount: 0,
    negativeCount: 0,
  });

  useEffect(() => {
    setIsRefresh(false);
    getCommentList();
  }, [isRefresh]);
  const [post, setPost] = useState<BoardDataType>();

  //ㄹ그인여부 본인게시글
  const userState = useSelector((state: RootState) => state.user.user);

  // 게시글이 없으면 isLoaded되지 않도록
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [commentPage, setCommentPage] = useState(1);
  const limit = 15;
  const commentQuery = `?$page=${page}&limit=${limit}`;
  //const boardComment = useBoardComment(postId, currentPage);

  const getPost = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/boards/${postId}`);
      console.log(data);
      setPost(data);
      setIsLoaded(true);
    } catch (error) {
      console.log('getPost error');
      console.log(error);
    }
  };

  const getCommentList = async () => {
    console.log('getCommentList 타나?');
    //console.log('getCommentList 진입');
    console.log('commentpage(getCommentList) : ', commentpage);
    console.log('currentPage(getCommentList) : ', currentPage);
    try {
      const response = await axios.get(
        `${serverUrl}/comments/${postId}?page=${currentPage}`,
        config,
      );
      console.log('Commentdata:', response.data);
      setComments(response.data);
      //setComments(boardComment.data?.data);
      return response.data;
    } catch (error) {
      console.error('getCommentList error');
      console.error(error);
    }
  };
  /*
  useEffect(() => {
    if (postId) {
      setComments(boardComment.data?.data);
      boardComment.executeQuery();
    }
    if (boardComment.data) {
      console.log('댓글 요청 성공');
      console.log(comments);
    }
    if (boardComment.error) {
      console.log(boardComment.error);
    }
  }, [postId, boardComment, commentPage]);
  */
  //getCommentList();
  //postId, commentPage, boardComment
  useEffect(() => {
    getPost();
  }, [postId]);

  const hasComments =
    comments && comments.count !== undefined && comments.list !== undefined;

  if (post && userState) {
    console.log(
      '로그인한 유저와 작성자 id 일치 확인',
      userState.userId === post.userId,
    );
  }
  if (hasComments) {
    console.log('comments : ', comments);
    console.log('comments.count : ', comments.count);
  }

  return (
    <div className="flex flex-col gap-3">
      <div>{post && <BoardCardDetail id={postId} post={post} />}</div>
      <button onClick={isClick}>댓글새로고침</button>
      <div>
        {hasComments && (
          <CommentAnalysis
            count={comments.count}
            list={comments.list}
            positiveCount={comments.positiveCount}
            negativeCount={comments.negativeCount}
          />
        )}
      </div>
      <br />
      <br />
      <div>
        {hasComments && (
          <Comments
            count={comments.count}
            list={comments.list}
            positiveCount={comments.positiveCount}
            negativeCount={comments.negativeCount}
          />
        )}
      </div>
      {hasComments && comments.count != 0 && (
        <Pagination
          totalContents={comments.count}
          bNumber={postId}
          //totalContents={15}
          contentsPerPage={15}
          currentPage={currentPage}
          paginate={commentPaginate}
        />
      )}

      <CommentInput />
    </div>
  );
};
export default withAuth(PostviewPage);
