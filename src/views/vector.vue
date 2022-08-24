<!--
 * @Author: zulezhe
 * @Date: 2022-08-23 22:56:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 14:15:37
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">{{ text }}</el-button>
</template>
<script>
import L from 'leaflet';
let featureGroup = null;
export default {
  components: {},
  data() {
    return {
      text: '显示线和面',
      has: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    featureGroup = L.featureGroup();
  },
  methods: {
    handleClick() {
      if (this.has) {
        console.log(111);
        this.removeVectorLayer();
      } else {
        this.addVectorLayer();
        console.log(22);
      }
    },
    addVectorLayer() {
      fetch('./data/vector.json')
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
          let polygon = L.polygon(result.polygon, { color: 'red' });
          let polyline = L.polyline(result.polyline, { color: 'red' });
          featureGroup.addLayer(polygon);
          featureGroup.addLayer(polyline);
          featureGroup.addTo(map);
          map.fitBounds(featureGroup.getBounds());
          this.text = '清除点和面';
          this.has = true;
        });
    },
    removeVectorLayer() {
      this.text = '显示点和面';
      featureGroup && featureGroup.clearLayers();
      this.has = false;
    }
  }
};
</script>
