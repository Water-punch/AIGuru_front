import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as Api from '../../utils/api'
import { useCallback } from "react"
import { AxiosResponse } from "axios"

type ApiResponse<T> = {
  data: T;
  headers: any;
};

// 서버 데이터 요청: get
export const useBaseQuery = <T = any> (endpoint: string, queryKey: string) => {
  const { isLoading, error, data } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await Api.get<T>(endpoint)
      return response.data;
    }
  })
  return {
    isLoading,
    error,
    data,
  }
}

// 서버 데이터 변경: post, put, delete
// 헤더에도 접근할 수 있게 mutationFn의 return값을 { data: response.data, headers: response.headers } 구조로 변경
// useBaseMutation.data = { data: response.data, headers: response.headers }
export const useBaseMutation = <T = any>(endpoint: string,  method: 'post' | 'put' | 'delete', bodyData?: FormData | Object, queryKey?: string) => {
  const queryClient = useQueryClient();
  const mutationFn = useCallback(async (): Promise<ApiResponse<T>> => {
    let response;
    switch (method) {
      case 'post':
        response = await Api.post<T>(endpoint, bodyData ?? {});
        break;
      case 'put':
        response = await Api.put<T>(endpoint, bodyData ?? {});
        break;
      case 'delete':
        response = await Api.del<T>(endpoint);
        break;
      default:
        throw new Error(`post, put, delete에서 method를 선택해주세요. 현재 선택 method:${method}`)
    }
    return { data: response.data, headers: response.headers }
  }, [endpoint, bodyData, method])
  
  const { isPending, isSuccess, error, data, mutate, } = useMutation<ApiResponse<T>>({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      }
    }
  })

  return {
    isPending,
    isSuccess,
    error,
    data,
    mutate,
  }
};
