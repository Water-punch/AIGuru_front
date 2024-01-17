import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";


export const useSendFirstMessage = (bodyData: SendingMessageType) => {
  return useBaseMutation<ChatResponseType>('/chat/first', bodyData , 'post')
}
