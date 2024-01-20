import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";

// // 커스텀 훅 작성 가이드
// // 게시글 작성
// interface PostContentType {
//   title: string;
//   content: string; // 예시입니다
//   tag: string;
// }

// export const usePostContent = (bodyData : PostContentType) => {
//   return useBaseMutation('/board', bodyData, 'post')
// }

// // 사용 예시
// const postContent = usePostContent({title: '오늘 헤어졌어요', content: '으아아', tag: '이별'})

// // 게시글 post 요청
// const handleSubmit = async () => {
//   postContent.mutate()
// }

// // 성공 시 상세페이지로 이동
// if(postContent.isSuccess) {
//   // api 호출 결과에서 postId 저장하기
//   const postId = postContent.data.postId
//   router.push('/board/[postId]') // useRouter import
// }

// if(postContent.error) {
//   alert('게시글 등록에 실패했습니다.')
//   console.log(postContent.error)
// }

export const useReadBoards = () => {
  return useBaseQuery('/boards', 'readboards')
}