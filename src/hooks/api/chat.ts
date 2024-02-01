import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import axios from "axios";
import { useState } from "react";

export const useFirstLoginMessage = () => {
  return useBaseMutation('/chat', 'post')
}

export const useFirstGuestMessage = () => {
  return useBaseMutation('/chat/free', 'post')
}

export const useChatList = () => {
  const [trigger, setTrigger] = useState(false);
  const { isLoading, error, data } = useBaseQuery(
    `/chat`,
    'chattingList',
    trigger,
  );

  const executeQuery = () => {
    setTrigger(true);
  };

  return {
    isLoading,
    error,
    data,
    executeQuery,
  };
};

export const useChatLog = (chatId: string) => {
  return useBaseQuery(`/chat/${chatId}`, `chatLog${chatId}`)
}

export const useAdditionalMessage = (chatId: string) => {
  return useBaseMutation(`/chat/${chatId}`, 'post')
}

