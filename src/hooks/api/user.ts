import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import { LoginRequestType, RegisterRequestType } from "@/src/components/types/UserTypes";
import { useState } from "react";

export const useRegister = (bodyData: RegisterRequestType) => {
  return useBaseMutation('/user/register', 'post', bodyData)
}

export const useEmailLogin = (bodyData: LoginRequestType) => {
  return useBaseMutation('/user/login/email', 'post', bodyData)
}

export const useEditUser = () => {
  return useBaseMutation('/user/edit', 'put')
}

// export const useLogout = () => {
//   return useBaseMutation('/user/logout', , 'post')
// }

export const useUserBoadrd = (query: string) => {

  return useBaseQuery(`/boards/my${query}`, 'userboard')
}

export const useUserComment = (query: string) => {

  return useBaseQuery(`/comments/my${query}`, 'userComment')
}

export const useGoogleLogin = () => {
  const [trigger, setTrigger] = useState(false);
  const { isLoading, error, data } = useBaseQuery('/user/login/google', 'googleLogin', trigger)

  const executeQuery = () => {
    setTrigger(true);
  }

  return {
    isLoading,
    error,
    data,
    executeQuery,
  }
}

export const useKakaoLogin = () => {
  const [trigger, setTrigger] = useState(false);
  const { isLoading, error, data } = useBaseQuery('/user/login/kakao', 'kakaoLogin', trigger)

  const executeQuery = () => {
    setTrigger(true);
  }

  return {
    isLoading,
    error,
    data,
    executeQuery,
  }
}


