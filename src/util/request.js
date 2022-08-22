/*
 * @Author: your name
 * @Date: 2020-10-25 14:45:14
 * @LastEditTime: 2020-10-27 00:27:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \moafly-spa\src\util\request.js
 */
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import { getToken, removeToken } from '@/util/auth';
import store from '@/store';
import qs from 'qs';
// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? '' : '', // url = base url + request url
  //baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
  // transformRequest: [
  //   function(data) {

  //     if (data instanceof FormData) {
  //       return data;
  //     }
  //     data = qs.stringify(data);
  //     return data;
  //   }
  // ]
});
// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken();

    if (token) config.headers.token = token;
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);
//Queens Park Rangers programmer crudds
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 和后台约定好,请求成功返回的标识
    if (response.status !== 200) {
      Message({
        message: res.message || 'An error occurred',
        type: 'error',
        duration: 5 * 1000,
        offset: 100
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          removeToken();
          store.commit('doRemove');
          this.$router.push('/signs');
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      offset: 100
    });
    return Promise.reject(error);
  }
);
function http(config) {
  if (config.method.toLowerCase() === 'post') {
    // qs系列化
    // https://www.npmjs.com/package/qs
    //  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
    //  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat', allowDots: true });
  } else {
    config.params = config.data;
  }

  return service(config);
}

export default http;
