import axios from 'axios';
import router from '@/router'
import { getToken,removeToken } from '@/utils/auth'
import { Notification } from '@arco-design/web-vue';

// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// // 创建一个 Axios 实例
// const instance = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API || '/api', // 基础 URL，可配置
//   timeout: 10000, // 请求超时时间
// });

axios.defaults.baseURL = 'http://127.0.0.1:8080/api'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 可在此添加全局请求头，例如 Token
    config.headers['Authorization'] = getToken()
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果是下载文件接口，直接返回 response
    if (response.config.responseType === 'blob') {
      return response;
    }
    
    if (typeof response.data !== 'object') {
      Notification.error({ title: '不妙啦 TAT', content: '服务端异常！' });
      return Promise.reject(res)
    }
    if (response.data.code != "00000") {
      if (response.data.message) Notification.error({ title: '不妙啦 TAT', content: response.data.message });
      // 登录已过期
      if (response.data.code == 'A0230') {
        removeToken();
        router.push({ name: 'loginOrRegister' })
      }
      return Promise.reject(response.data)
    }
    // 直接返回数据部分
    return response.data;
  },
  (error) => {
    // 统一处理错误，例如提示消息
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default axios;
