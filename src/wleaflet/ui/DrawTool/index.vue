<!--
 * @Author: zulezhe
 * @Date: 2022-08-23 09:25:11
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 21:56:30
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div></div>
</template>
<script>
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
export default {
  name: 'DrawTool',
  props: {
    map: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.map.pm.addControls({
      position: 'topleft',
      drawPolygon: true, // 添加绘制多边形
      drawMarker: true, //添加按钮以绘制标记
      drawCircleMarker: true, //添加按钮以绘制圆形标记
      drawPolyline: true, //添加按钮绘制线条
      drawRectangle: true, //添加按钮绘制矩形
      drawCircle: true, //  添加按钮绘制圆圈
      editMode: true, //  添加按钮编辑多边形
      dragMode: true, //   添加按钮拖动多边形
      cutPolygon: true, // 添加一个按钮以删除图层里面的部分内容
      removalMode: true // 清除图层
    });
    // 设置绘制后的线条颜色等
    this.map.pm.setPathOptions({
      color: 'blue',
      fillColor: 'pink',
      fillOpacity: 0.4
    });
    this.map.pm.setLang('zh'); //设置语言
    this.map.on('pm:drawstart', e => {
      //绘制开始时事件
      console.log(e, 'first');
    });
    this.map.on('pm:create', e => {
      console.log(e, '绘制完成时调用');
      console.log(JSON.stringify(e.layer._latlngs)); //获取绘制的坐标           绘制线段时不能显示第一个点坐标
    });
  },
  components: {},
  methods: {}
};
</script>
