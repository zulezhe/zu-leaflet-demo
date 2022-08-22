/*
 * @Author: zulezhe
 * @Date: 2022-08-22 17:58:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-22 18:27:28
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import '@/assets/styles/include.less';
import * as directives from '@/directives';
import * as filters from '@/filters';
import '@/plugins/element-ui.js';
// 全局注册自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});
// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
