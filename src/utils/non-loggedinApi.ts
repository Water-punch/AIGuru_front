import axios from 'axios';

const serverUrl = 'http://localhost:5000';

const api = axios.create({
  baseURL: serverUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  req => {
    if (req.data && req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-data';
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

async function post(endpoint: string, data: FormData | Object) {
  try {
    const res = api.post(endpoint, data);
    console.log(`${endpoint} post요청 성공, 요청 데이터: ${data}`);
    return res;
  } catch (err) {
    console.log(`${endpoint} post요청 실패, 요청 데이터: ${data}`, err);
    throw err;
  }
}

export { get, post };
