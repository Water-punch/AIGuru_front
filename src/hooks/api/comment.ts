import {
  ChatResponseType,
  SendingMessageType,
} from '@/src/components/types/ChatTypes';
import { useBaseMutation, useBaseQuery } from './reactQueryConfig';
import { CommentProps } from '@/src/components/types/CommentTypes';

// 커스텀 훅 작성 가이드
// // 전체 댓글 읽기
export const useReadComments = () => {
  return useBaseQuery('/comments', 'readcomments');
};

export const useWriteComment = (bodyData: CommentProps) => {
  return useBaseMutation('/comments', bodyData, 'post');
};
