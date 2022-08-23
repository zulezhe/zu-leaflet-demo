/*
 * @Author: zulezhe
 * @Date: 2022-08-23 10:08:29
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 11:58:46
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import L from 'leaflet';
import 'leaflet-canvas-marker';
/**
 * 添加点
 */
export function addMarker(item) {
  console.log('item===>', item);
  let marker = L.marker([Number(item.lat), Number(item.lng)], {
    icon: L.icon({
      iconUrl: item.icon.iconUrl,
      iconSize: item.icon.iconSize,
      iconAnchor: [0, 0],
      popupAnchor: [5, 0]
    }),
    customData: { ...item }
  });
  marker
    .bindTooltip(item.name, {
      direction: 'top'
    })
    .openTooltip();
  // marker.on('mouseover', onMouseover);
  // marker.on('mouseout', onMouseout);
  // marker.on('click', onClick);
  return marker;
}
/**
 * 添加多点
 * @param {*} list
 */
export function addMarkers(map, list, options) {
  let layerGroup = L.layerGroup();
  // let markers = list.map(item => addMarker({ ...item, ...options }));
  // console.log('layerGroup===>', markers);
  list.map(item => {
    layerGroup.addLayer(addMarker({ ...item, ...options }));
  });
  layerGroup.addTo(map);
}
/**
 * 添加海量点
 */
export function addHugeMarkers(list) {
  let layerGroup = L.canvasIconLayer();
  let markers = list.map(item => addMarker(item));
  layerGroup.addLayer(markers);
}
/**
 * 删除点
 */
export function removeMarker() {}
/**
 * 查找点
 */
export function findMarker() {}
/**
 * 更新点
 */
export function updateMarker() {}
/**
 * 移入点
 */
export function onMouseover(e) {
  console.log('鼠标移入', e);
  let target = e.target;
  let customData = target.options.customData;
  e.target
    .bindTooltip(customData.name, {
      direction: 'top'
    })
    .openTooltip();
}
/**
 * 移出点
 */
export function onMouseout(e) {
  console.log('鼠标移出', e);
  e.target.closeTooltip();
}
/**
 * 点击点
 */
export function onClick(e) {
  console.log('点击点', e);
}
