import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as Api from '../../utils/api'
import { useCallback } from "react"
import { AxiosResponse } from "axios"

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
export const useBaseMutation = <T = any>(endpoint: string, bodyData: FormData | Object, method: 'post' | 'put' | 'delete', queryKey?: string) => {
  const queryClient = useQueryClient();
  const mutationFn = useCallback(async () => {
    let result;
    switch (method) {
      case 'post':
        result = await Api.post<T>(endpoint, bodyData);
        break;
      case 'put':
        result = await Api.put<T>(endpoint, bodyData);
        break;
      case 'delete':
        result = await Api.del<T>(endpoint);
        break;
      default:
        throw new Error(`post, put, delete에서 method를 선택해주세요. 현재 선택 method:${method}`)
    }
    return result.data
  }, [endpoint, bodyData, method])
  
  const { isPending, isSuccess, error, data, mutate, } = useMutation<T>({
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
