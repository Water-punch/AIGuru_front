import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import axios from "axios";


export const useSendFirstMessage = (bodyData: SendingMessageType) => {
  return useBaseMutation<ChatResponseType>('/chat/first', bodyData , 'post')
}

export const useTemporaryApi = async (bodyData: SendingMessageType): Promise<ChatResponseType | undefined> => {
  try {
    const serverUrl = 'http://localhost:5000';
    const response = await axios.post<ChatResponseType>(`${serverUrl}/chat/first`, bodyData)
    return response.data
  } catch (error) {
      console.error('api 호출 오류', error);
  }
}

