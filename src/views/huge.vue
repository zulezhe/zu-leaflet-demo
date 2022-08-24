<!--
 * @Author: zulezhe
 * @Date: 2022-08-24 08:03:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 08:09:42
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">加载10000点</el-button>
</template>
<script>
import L from 'leaflet';
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
      var ciLayer = L.canvasIconLayer({}).addTo(map);
      for (var i = 0; i < 100000; i++) {
        var lat = 39.905963 + (Math.random() - Math.random()) * 3;
        var lng = 116.390813 + (Math.random() - Math.random()) * 3;
        //在这里设置图片和文字，调整位置，让文字显示在图片上
        var icon = L.icon({
          iconUrl: require('@/assets/imags/menu-item-default-bg.png'),
          iconSize: [84, 34],
          iconAnchor: [40, 20],
          //添加文字
          text: i.toString(),
          textAnchor: [5, 0],
          textFont: '14px bold', //设置字体大小和样式
          textFillStyle: '#FFFFFF' //设置字体颜色
        });

        var marker = L.marker([lat, lng], {
          icon: icon
        }).bindPopup('I Am ' + i); //绑定气泡窗口
        ciLayer.addLayer(marker);
      }
    }
  }
};
</script>
<style scoped lang="less">
.add-button {
  position: absolute;
  left: 100px;
  top: 20px;
  z-index: 9999;
}
</style>
