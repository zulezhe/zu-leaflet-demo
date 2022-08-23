<!--
 * @Author: zulezhe
 * @Date: 2022-08-23 22:56:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 23:47:55
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" class="add-button" @click="handleClick">{{ text }}</el-button>
  
</template>
<script>
import L from 'leaflet';
import 'leaflet.motion/dist/leaflet.motion.js';
let featureGroup = null;
let route = null;
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
          route = result.polyline;
          featureGroup.addLayer(polygon);
          featureGroup.addLayer(polyline);
          featureGroup.addTo(map);
          map.fitBounds(featureGroup.getBounds());
          this.text = '清除点和面';
          this.has = true;
          this.move();
        });
    },
    removeVectorLayer() {
      this.text = '显示点和面';
      featureGroup && featureGroup.clearLayers();
      this.has = false;
    },
    move() {
      let seqGroup = L.motion
        .seq([
          L.motion
            .polyline(
              route,
              {
                color: 'orangered'
              },
              {
                easing: L.Motion.Ease.easeInOutQuad
              },
              {
                removeOnEnd: true,
                icon: L.divIcon({ html: "<i class='icon'>✈</i>", iconSize: L.point(27.5, 24) })
              }
            )
            .motionDuration(8000)
        ])
        .addTo(map);
      seqGroup.motionStart();
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
