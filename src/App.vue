<!--
 * @Author: wangchaoxu
 * @Date: 2021-04-14 17:21:17
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-22 18:31:18
 * @Path: https://gitee.com/wangchaoxu/
 * @Description:
-->
<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
import Home from '@/views';
export default {
  components: { Home },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
