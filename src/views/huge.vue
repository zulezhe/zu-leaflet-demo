<!--
 * @Author: zulezhe
 * @Date: 2022-08-24 08:03:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 14:39:15
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">{{ text }}</el-button>
</template>
<script>
import { addHugeMarkers } from '@/wleaflet/core/marker.js';
let layer = null;
export default {
  components: {},
  data() {
    return {
      text: '加载10000点'
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      if (layer) {
        map.removeLayer(layer);
        layer = null;
        this.text = '加载10000点';
        map.zoomOut();
      } else {
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
        layer = addHugeMarkers(list, {
          icon: {
            iconUrl: require('@/assets/images/warn.png'),
            iconSize: [30, 30]
          }
        });
        this.text = '清除';
        map.zoomIn();
      }
    }
  }
};
</script>
