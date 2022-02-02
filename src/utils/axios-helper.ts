import axios from 'axios';
import qs from 'qs';
import { useAppStore } from '../stores/app';
const userStore = useAppStore();

const service = axios.create({
  timeout: 5000, //超时时间
  baseURL: import.meta.env.BASE_URL, // 我们在请求接口的时候就不同写前面 会自动我们补全
  transformRequest: (data) => qs.stringify(data), //post请求参数处理,防止post请求跨域
});
// http request 拦截器
service.interceptors.request.use(
  (config) => {
    //如果存在jwt，则将jwt添加到每次请求之中..
    if (userStore.appUser?.jwt) {
      config.params = {
        ...config.params,
        jwt: userStore.appUser?.jwt,
      };
    }
    return config;
  },
  (err) => {
    return err;
  }
);
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    debugger;
    //接收返回数据..
    const res = response.data;
    //判断返回数据是否存在状态code和错误提示信息..
    if (!res.code || !res.data) {
      return showMessage('响应数据格式错误');
    }
    //判断状态code是否为指定数值(200)..
    if (res.code != 200) {
      return showMessage(res.msg);
    }
    return res;
  },
  (err) => {
    return showMessage(err.message);
  }
);

//封装错误提示信息..
const showMessage = (msg: any) => {
  // Message({
  //   message: msg, //错误提示信息
  //   type: 'error', //显示类型
  //   duration: 3 * 1000, //展示时间
  // });
  return Promise.reject(msg);
};
export default service;
