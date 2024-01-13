import { useMutation, useQuery } from "@tanstack/react-query"
import * as Api from '../../utils/api'
import { useCallback } from "react"

export const useBaseQuery = (endpoint: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${endpoint}`],
    queryFn: () => Api.get(endpoint)
  })
  return {
    isLoading,
    error,
    data,
  }
}

export const useBaseMutation = (endpoint: string, bodyData: FormData | Object, method: 'post' | 'put' | 'delete') => {
  const mutationFn = useCallback(() => {
    switch (method) {
      case 'post':
        return Api.post(endpoint, bodyData);
      case 'put':
        return Api.put(endpoint, bodyData);
      case 'delete':
        return Api.del(endpoint);
      default:
        throw new Error(`post, put, delete에서 method를 선택해주세요. 현재 선택 method:${method}`)
    }
  }, [endpoint, bodyData, method])
  
  const { isPending, isSuccess, error, data, mutate } = useMutation({
    mutationFn: mutationFn
  })

  return {
    isPending,
    isSuccess,
    error,
    data,
    mutate,
  }
};