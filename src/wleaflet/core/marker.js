/*
 * @Author: zulezhe
 * @Date: 2022-08-23 10:08:29
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 20:06:24
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import L from 'leaflet';
import 'leaflet-canvas-marker';
/**
 * 添加点
 */
export function addMarker(item) {
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
  let featureGroup = L.featureGroup();
  list.map(item => {
    featureGroup.addLayer(addMarker({ ...item, ...options }));
  });
  featureGroup.addTo(map);
  map.fitBounds(featureGroup.getBounds());
  return featureGroup;
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
 * 清空要素组
 */
export function clearGroup(group) {
  group.clearLayers();
}
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
/**
 * 聚焦到多点
 * @param {*} map
 * @param {*} markers
 */
export function setViewMarkers(map, markers) {
  let markerBounds = L.latLngBounds([]);
  markers.forEach(marker => {
    markerBounds.extend([marker.lat, marker.lng]);
  });
  map.fitBounds(markerBounds);
}
/**
 * 飞行到点
 * @param {*} map
 * @param {*} position
 * @param {*} zoom
 */
export function flyTo(map, position, zoom = 13) {
  map.flyTo(position, zoom);
}
