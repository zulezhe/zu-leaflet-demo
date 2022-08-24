<!--
 * @Author: zulezhe
 * @Date: 2022-08-23 22:56:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 14:26:55
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">{{ text }}</el-button>
</template>
<script>
import L from 'leaflet';
import 'leaflet.motion/dist/leaflet.motion.js';
let seqGroup = null;
export default {
  components: {},
  data() {
    return {
      text: '移动',
      has: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      if (this.text == '暂停') {
        this.pause();
        this.text = '继续';
      } else if (this.text == '停止') {
        this.stop();
      } else if (this.text == '继续') {
        this.resume();
         this.text = '暂停';
      } else {
        this.move();
      }
    },
    stop() {
      seqGroup.motionStop();
    },
    pause() {
      seqGroup.motionPause();
    },
    resume() {
      seqGroup.motionResume(); //继续
    },
    move() {
      let route = [
        { lat: 33.895497227123876, lng: 115.27130126953126 },
        { lat: 34.00030430441023, lng: 116.619873046875 },
        { lat: 34.25721644329402, lng: 115.69702148437501 }
      ];
      seqGroup = L.motion
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
                showMarker: true,
                removeOnEnd: true,
                icon: L.divIcon({ html: "<i class='icon' style='fontSize:30px'>✈</i>", iconSize: L.point(36, 36) })
              }
            )
            .motionDuration(18000)
        ])
        .addTo(map);
      seqGroup.motionStart();
      this.has = true;
      this.text = '暂停';
    }
  }
};
</script>
