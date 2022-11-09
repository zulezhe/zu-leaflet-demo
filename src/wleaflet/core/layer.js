/*
 * @Author: zulezhe
 * @Date: 2022-09-01 18:27:05
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-11-09 17:12:31
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import L from 'leaflet';
import 'leaflet.heat';
export function addHeatMap() {
  var heatNumbers = 150,
    heatRadius = 30;
  var num = parseInt(heatNumbers);
  num = num > 0 ? num : 0;
  var radius = parseInt(heatRadius);
  radius = radius > 0 ? radius : 0;
  var heatPoints = [];
  for (var i = 0; i < num; i++) {
    heatPoints[i] = [Math.random() * 0.28 + 39.78, Math.random() * 0.5 + 116.12, Math.random() * 80];
  }
  L.heatLayer(heatPoints, {
    radius: radius,
    minOpacity: 0.5
  }).addTo(map);
}
