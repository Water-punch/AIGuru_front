import { ChatResponseType, SendingMessageType } from "@/src/components/types/ChatTypes";
import { useBaseMutation, useBaseQuery } from "./reactQueryConfig";
import { LoginRequestType, RegisterRequestType } from "@/src/components/types/UserTypes";

export const useRegister = (bodyData: RegisterRequestType) => {
  return useBaseMutation('/user/register', 'post', bodyData)
}

export const useEmailLogin = (bodyData: LoginRequestType) => {
  return useBaseMutation('/user/login/email', 'post', bodyData)
}

export const useEditUser = () => {
  return useBaseMutation('/user/edit', 'put')
}

export const useGoogleLogin = () => {
  return useBaseQuery('/user/login/google', 'googleLogin')
}

export const useKakaoLogin = () => {
  return useBaseQuery('/user/login/kakao', 'kakaoLogin')
}

// export const useLogout = () => {
//   return useBaseMutation('/user/logout', , 'post')
// }