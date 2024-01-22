import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";

// 자신이 작성한 게시글 목록 조회
export const useMyBoard = (page: number) => {
  return useBaseQuery(`/boards/my?page=${page}&limit=15`, 'myBoard') 
}

interface WriteBoardType {
  title: string;
  content: string;
  tag: string;
}

export const useWriteBoard = (bodyData: WriteBoardType) => {
  return useBaseMutation(`/boards`, 'post', bodyData)
}