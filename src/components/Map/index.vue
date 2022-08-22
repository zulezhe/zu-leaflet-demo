<!--
 * @Author: zulezhe
 * @Date: 2022-08-22 18:20:47
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-22 18:35:52
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div :class="['wcx-map-container', customClass]" id="wcx-map"></div>
</template>
<script>
import L from 'leaflet';
export default {
  components: {},
  props: {
    customClass: {
      type: String,
      default: 'wcx-custom-map'
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let map = L.map('wcx-map', {
        crs: L.CRS.EPSG4326,
        center: [0, 0],
        maxZoom: 18,
        zoom: 1
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
    }
  }
};
</script>
<style scoped lang="less">
.wcx-map-container {
  width: 100%;
  height: 100%;
}
</style>
