import axios, { AxiosResponse } from 'axios';

// const serverUrl = 'http://localhost:5000';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});

api.interceptors.request.use(
  req => {
    const token = localStorage.getItem('token');

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
