/*
 * @Author: your name
 * @Date: 2020-10-25 14:45:14
 * @LastEditTime: 2020-10-25 16:24:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \moafly-spa2\src\filters\index.js
 */
import Vue from 'vue';
import { timeFormat, numberFormat, formatNumber } from '@/util';

const filters = {
  timeFormat,
  numberFormat,
  formatNumber
};
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
