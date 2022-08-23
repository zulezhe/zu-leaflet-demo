<!--
 * @Author: zulezhe
 * @Date: 2022-08-22 18:20:47
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 21:16:32
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div :class="['wcx-map-container', customClass]" :id="el">
    <template v-if="map">
      <slot :map="map"></slot>
    </template>
  </div>
</template>
<script>
import L from 'leaflet';
import { TiledMapLayer } from '@supermap/iclient-leaflet';
export default {
  components: {},
  props: {
    customClass: {
      type: String,
      default: 'wcx-custom-map'
    },
    el: {
      type: String,
      default: 'map'
    },
    options: {
      type: Object,
      default: () => {
        return {
          center: [34.759197, 113.778584],
          zoom: 10,
          minZoom: 4,
          maxZoom: 16
        };
      }
    }
  },
  data() {
    return {
      map: null
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let China = new TiledMapLayer('https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China', { noWrap: true });
      let ChinaDark = new TiledMapLayer('https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark', { noWrap: true });
      let arcgis = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
      window.map = this.map = L.map(this.el, {
        ...this.options,
        layers: [China]
      });
      let baseMaps = {
        China: China,
        ChinaDark: ChinaDark,
        arcgis: arcgis
      };
      L.control.layers(baseMaps).addTo(this.map);
      this.$emit('mapComplete', this.map);
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
