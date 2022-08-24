/*
 * @Author: zulezhe
 * @Date: 2022-08-22 17:58:57
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 13:17:59
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/include.less';
import '@/plugins/element-ui.js';
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount('#app');
