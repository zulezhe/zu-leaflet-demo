<!--
 * @Author: zulezhe
 * @Date: 2022-08-24 08:03:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 13:06:39
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">5000标签避让</el-button>
</template>
<script>
import '@/wleaflet/lib/L.LabelTextCollision.js';
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
      var layers = L.featureGroup().addTo(map);
      for (var i = 0; i < 5000; i++) {
        var lat = 34.759197 + (Math.random() - Math.random()) * 3;
        var lng = 113.778584 + (Math.random() - Math.random()) * 3;
        var latlng = L.latLng(lat, lng);
        var marker = L.circleMarker(latlng, {
          radius: 0,
          text: '我是第' + i + '个标签',
          textStyle: {
            stroke: true,
            width: 80,
            hieght: 40,
            color: 'blue',
            font: "15px 'Microsoft Yahei'",
            offsetX: -70,
            offsetY: -10
          }
        });
        layers.addLayer(marker);
      }
    }
  }
};
</script>
<style scoped lang="less">
.add-button {
  position: absolute;
  left: 320px;
  top: 20px;
  z-index: 9999;
}
</style>
