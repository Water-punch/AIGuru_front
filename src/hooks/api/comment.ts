import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";

// 커스텀 훅 작성 가이드
// // 전체 댓글 읽기
// export const useReadComments = () => {
//   return useBaseQuery('comments', 'readcomments')
// }

// // 사용 예시
// const readAllComments = useReadComments()
// console.log(readAllComments.data)