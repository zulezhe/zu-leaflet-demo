/*
 * @Author: your name
 * @Date: 2020-10-25 14:45:14
 * @LastEditTime: 2022-08-24 13:09:19
 * @LastEditors: zulezhe
 * @Description: In User Settings Edit
 * @FilePath: \moafly-spa2\src\plugins\element-ui.js
 */
import Vue from 'vue';
import { Button, Message, Loading, Table, TableColumn, Pagination } from 'element-ui';
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$loading = {
  loading: null,
  open() {
    this.loading = Loading.service({
      // 声明一个loading对象
      lock: true, // 是否锁屏
      text: '正在加载...', // 加载动画的文字
      spinner: 'el-icon-loading', // 引入的loading图标
      background: 'rgba(0, 0, 0, 0.5)', // 背景颜色
      target: '.sub-main', // 需要遮罩的区域
      body: true,
      customClass: 'mask' // 遮罩层新增类名
    });
    setTimeout(() => {
      // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
      this.loading.close(); // 关闭遮罩层
    }, 5000);
  },
  close() {
    this.loading.close();
  }
};
