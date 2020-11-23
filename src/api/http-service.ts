import axios from 'axios';
const service = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  withCredentials: true, // 允许携带cookie
});

/**
 * 请求拦截
 */
service.interceptors.request.use((config) => {
  return config;
}, (error) => {
  Promise.reject(error);
});

/**
 * 响应拦截
 */
service.interceptors.response.use((response) => {
  return Promise.resolve(response);
}, (error) => {
  return Promise.reject(error);
});

export default service;
