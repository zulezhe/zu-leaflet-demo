<!-- 
  canvas闪烁
 -->

<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">{{ text }}</el-button>
</template>
<script>
import L from 'leaflet';
import '@/wleaflet/lib/leaflet.canvas-markers.js';
import { addHugeMarkers } from '@/wleaflet/core/marker.js';
let timer = null;
export default {
  components: {},
  data() {
    return {
      text: '加载canvas点并闪烁',
      canvaslayer: null,
      startTime: 0,
      markers: null
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.canvaslayer = L.canvasIconLayer({}).addTo(map);
    console.log("this.canvaslayer==>",this.canvaslayer);
  },
  methods: {
    handleClick() {
      if (this.markers) {
        map.removeLayer(this.canvaslayer);
        this.markers = null;
        this.text = '加载canvas点并闪烁';
        window.cancelAnimationFrame(timer);
      } else {
        this.animation();
        this.text = '清除';
      }
    },
    renderCanvasMarkerLayer() {
      const list = [
        { lat: 34.552225566581136, lng: 114.14270613544706, name: '第0个' },
        { lat: 34.827366200034355, lng: 113.52614169270612, name: '第1个' },
        { lat: 32.34199832194076, lng: 113.49367023201583, name: '第2个' },
        { lat: 35.82422038696343, lng: 114.94757111257992, name: '第3个' },
        { lat: 33.71462883854374, lng: 113.13244199882999, name: '第4个' },
        { lat: 35.53287094277148, lng: 112.93261980824565, name: '第5个' },
        { lat: 34.3695249131982, lng: 116.12278078296558, name: '第6个' },
        { lat: 37.10660274681994, lng: 113.73501273244844, name: '第7个' },
        { lat: 35.336356079654436, lng: 115.78847537750687, name: '第8个' },
        { lat: 36.32392006344362, lng: 113.20076946719705, name: '第9个' }
      ];
      this.markers = list.map(item => {
        return this.addMarker({
          ...item,
          icon: {
            iconUrl: require('@/assets/images/windy.png'),
            iconSize: [30, 30]
          }
        });
      });
      this.canvaslayer.addMarkers(this.markers);
      this.startTime = new Date().getTime();
    },
    addMarker(item) {
      let marker = L.marker([Number(item.lat), Number(item.lng)], {
        code: 'marker-' + item.code,
        icon: L.icon({
          iconUrl: item.icon.iconUrl,
          iconSize: item.icon.iconSize,
          iconAnchor: [0, 0],
          popupAnchor: [5, 0],
          className: 'leaflet-custom-icon'
        }),
        customData: { ...item }
      });
      marker
        .bindTooltip(item.name, {
          direction: 'top',
          offset: L.point(15, 0)
        })
        .openTooltip();
      return marker;
    },
    randomData() {
      let list = [];
      for (var i = 0; i < 10; i++) {
        var lat = 34.759197 + (Math.random() - Math.random()) * 3;
        var lng = 113.778584 + (Math.random() - Math.random()) * 3;
        list.push({
          lat: lat,
          lng: lng,
          name: '第' + i + '个'
        });
      }
      return list;
    },
    animation() {
      this.nowTime = new Date().getTime();
      if (this.markers) {
        this.markers.map(marker => {
          this.canvaslayer.removeMarker(marker);
        });
        this.canvaslayer.redraw();
        this.markers = null;
      } else {
        if (this.nowTime - this.startTime > 80) {
          console.log('this===>', this.nowTime - this.startTime);
          this.renderCanvasMarkerLayer();
          this.startTime = this.nowTime;
        }
      }
      timer = requestAnimationFrame(this.animation);
    }
  }
};
</script>
<style scoped lang="less">
.flashing-container {
  width: 100%;
  height: 100%;
}
</style>
