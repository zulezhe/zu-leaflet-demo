<!--
 * @Author: zulezhe
 * @Date: 2022-08-24 08:03:34
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 14:37:12
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">{{ text }}</el-button>
</template>
<script>
import '@/wleaflet/lib/L.LabelTextCollision.js';
let featureGroup = null;
export default {
  components: {},
  data() {
    return {
      text: '5000标签避让'
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      if (featureGroup) {
        map.removeLayer(featureGroup);
        featureGroup = null;
        map.zoomOut();
        this.text = '5000标签避让';
      } else {
        featureGroup = L.featureGroup().addTo(map);
        for (var i = 0; i < 5000; i++) {
          let lat = 34.759197 + (Math.random() - Math.random()) * 3;
          let lng = 113.778584 + (Math.random() - Math.random()) * 3;
          let latlng = L.latLng(lat, lng);
          let marker = L.circleMarker(latlng, {
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
          featureGroup.addLayer(marker);
        }
        map.zoomIn();
        this.text = '清除标签';
      }
    }
  }
};
</script>
