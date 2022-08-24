<!--
 * @Author: zulezhe
 * @Date: 2022-08-24 08:03:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 12:50:37
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">加载10000点</el-button>
</template>
<script>
import { addHugeMarkers } from '@/wleaflet/core/marker.js';
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      let list = [];
      for (var i = 0; i < 10000; i++) {
        var lat = 34.759197 + (Math.random() - Math.random()) * 3;
        var lng = 113.778584 + (Math.random() - Math.random()) * 3;
        list.push({
          lat: lat,
          lng: lng,
          name: '第' + i + '个'
        });
      }
      addHugeMarkers(list, {
        icon: {
          iconUrl: require('@/assets/images/warn.png'),
          iconSize: [30, 30]
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.add-button {
  position: absolute;
  left: 200px;
  top: 20px;
  z-index: 9999;
}
</style>
