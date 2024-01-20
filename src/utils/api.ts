import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  // baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

api.interceptors.request.use(
  req => {
    const token = useSelector((state: RootState) => state.token.accessToken)

    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }

    if (req.data && req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-bodyData';
    }
    return req;
  },
  err => {
    console.log(err);
  },
);

// // 헷갈리는 부분
// api.interceptors.response.use(
//   res => res,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       // 리프레시 토큰을 사용하여 새 액세스 토큰을 요청하는 로직 추가
//       try {
//         // 백엔드와 논의가 필요
//         const response = await api.post('/path/to/refresh/token');
//         const newAccessToken = response.data.accessToken;

//         // 새 토큰 저장 로직 

//         // 원래 요청에 새 토큰을 설정, 재시도
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         // 리프레시 토큰 요청 실패 처리
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// )

async function get<T = any>(endpoint: string): Promise<AxiosResponse<T>> {
  return await api.get<T>(endpoint);
}

async function post<T = any>(endpoint: string, bodyData: FormData | Object) {
  return await api.post<T>(endpoint, bodyData);
}

async function put<T = any>(endpoint: string, bodyData: FormData | Object) {
  return await api.put<T>(endpoint, bodyData)
}

async function del<T = any>(endpoint: string) {
  return await api.delete<T>(endpoint)
}

export { get, post, put, del };
