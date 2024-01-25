import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  // baseURL: 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  req => {

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

//         //
//     }
//     return Promise.reject(error);
//   }
// )

async function get<T = any>(endpoint: string, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}`} : {}
  return await api.get<T>(endpoint, { headers });
}

async function post<T = any>(endpoint: string, bodyData: FormData | Object, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}`} : {}
  return await api.post<T>(endpoint, bodyData, { headers });
}

async function put<T = any>(endpoint: string, bodyData: FormData | Object, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}`} : {}
  return await api.put<T>(endpoint, bodyData, { headers })
}

async function del<T = any>(endpoint: string, token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}`} : {}
  return await api.delete<T>(endpoint, { headers })
}

export { get, post, put, del };
