import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import axios from "axios";


export const useFirstMessage = () => {
  return useBaseMutation('/chat/free', 'post')
}

export const useChatList = () => {
  return useBaseQuery('/chat', 'chattingList')
}

export const useChatLog = (chatId: string) => {
  return useBaseQuery(`/chat/${chatId}`, `chatLog${chatId}`)
}

export const useAdditionalMessage = (chatId: string) => {
  return useBaseMutation(`/chat/${chatId}`, 'post')
}

