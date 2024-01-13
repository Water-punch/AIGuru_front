import axios from 'axios';

const serverUrl = 'http://localhost:5000';

const api = axios.create({
  baseURL: serverUrl,
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

async function get(endpoint: string) {
  try {
    const res = await api.get(endpoint);
    console.log(`${endpoint} get요청 성공`);
    return res;
  } catch (err) {
    console.log(`${endpoint} get요청 실패`, err);
    throw err;
  }
}

async function post(endpoint: string, bodyData: FormData | Object) {
  try {
    const res = api.post(endpoint, bodyData);
    console.log(`${endpoint} post요청 성공, 요청 데이터: ${bodyData}`);
    return res;
  } catch (err) {
    console.log(`${endpoint} post요청 실패, 요청 데이터: ${bodyData}`, err);
    throw err;
  }
}

async function put(endpoint: string, bodyData: FormData | Object) {
  try {
    const res = api.put(endpoint, bodyData);
    console.log(`${endpoint} put요청 성공, 요청 데이터: ${bodyData}`);
    return res;
  } catch (err) {
    console.log(`${endpoint} put요청 실패, 요청 데이터: ${bodyData}`, err);
    throw err;
  }
}

async function del(endpoint: string) {
  try {
    const res = api.delete(endpoint);
    console.log(`${endpoint} delete요청 성공`);
    return res;
  } catch (err) {
    console.log(`${endpoint} delete요청 실패`, err);
    throw err;
  }
}

export { get, post, put, del };
