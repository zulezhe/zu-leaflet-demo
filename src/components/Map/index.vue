<!--
 * @Author: zulezhe
 * @Date: 2022-08-22 18:20:47
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-22 23:09:34
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div :class="['wcx-map-container', customClass]" :id="el"></div>
</template>
<script>
import L from 'leaflet';
import { TiledMapLayer, TiandituTileLayer, TianDiTu_MercatorCRS } from '@supermap/iclient-leaflet';
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
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var China = new TiledMapLayer('https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China', { noWrap: true });
      var ChinaDark = new TiledMapLayer('https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark', { noWrap: true });
      let tdt = new TiandituTileLayer({
        layerType: 'img',
        key: '1d109683f4d84198e37a38c442d68311'
      });
      let tdt2 = new TiandituTileLayer({
        layerType: 'img',
        isLabel: true,
        key: '1d109683f4d84198e37a38c442d68311'
      });
      var map = L.map(this.el, {
        ...this.options,
        layers: [China]
      });
      var baseMaps = {
        China: China,
        ChinaDark: ChinaDark,
        tdt: tdt,
        tdt2: tdt2
      };
      L.control.layers(baseMaps).addTo(map);
      // new TiledMapLayer(url).addTo(map);
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
