import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import { LoginRequestType, RegisterRequestType } from "@/src/components/types/UserTypes";

export const useRegister = (bodyData: RegisterRequestType) => {
  return useBaseMutation('/user/register', bodyData , 'post')
}

export const useEmailLogin = (bodyData: LoginRequestType) => {
  return useBaseMutation('/user/login/email', bodyData, 'post')
}

