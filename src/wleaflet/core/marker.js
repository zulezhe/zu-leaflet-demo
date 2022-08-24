/*
 * @Author: zulezhe
 * @Date: 2022-08-23 10:08:29
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-24 07:53:45
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import L from 'leaflet';
import 'leaflet-canvas-marker';
let popup = null;
let featureGroup = null;
/**
 * 添加点
 */
export function addMarker(item) {
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
  marker.on('click', onClick);
  return marker;
}
// export function addMarker(item) {
//   let marker = L.marker([Number(item.lat), Number(item.lng)], {
//     code: 'marker-' + item.code,
//     icon: L.divIcon({
//       html: `
//       <div class="custom-div-icon-container">
//         <img src="${item.icon.iconUrl}" alt="">
//       </div>
//       `,
//       iconSize: L.point(27.5, 24)
//     }),
//     customData: { ...item }
//   });
//   marker
//     .bindTooltip(item.name, {
//       direction: 'top',
//       offset: L.point(15, 0)
//     })
//     .openTooltip();
//   marker.on('click', onClick);
//   return marker;
// }
/**
 * 添加多点
 * @param {*} list
 */
export function addMarkers(list, options) {
  featureGroup = L.featureGroup();
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
  let target = e.target;
  console.log('点击点', e, target);
  let layers = featureGroup.getLayers();
  layers.map(layer => {
    if (layer.options.code === target.options.code) {
      // console.log(layer.getIcon());
      target.setIcon(
        L.icon({
          iconUrl: require('@/assets/images/1-2.png'),
          className: 'leaflet-custom-icon active'
        })
      );
      // L.DomUtil.addClass(layer, 'active');
    } else {
      layer.setIcon(
        L.icon({
          iconUrl: require('@/assets/images/1.png'),
          className: 'leaflet-custom-icon'
        })
      );
    }
  });
  console.log('获取featureGroup上的所有图层===>', layers);
  // L.DomUtil.addClass(target, 'active');
  popup = L.popup({
    offset: L.point(10, 0)
  }).setLatLng([e.latlng.lat, e.latlng.lng]).setContent(`
      <div class="custom-popup-container" style="width:300px;height:240px;">
        <div class="row">
            <span class="title">名称:</span>
            <span class="value">${target.options.customData.name}</span>
        </div>
        <div class="row">
            <span class="title">所属省份:</span>
            <span class="value">${target.options.customData.province}</span>
        </div>
        <div class="row">
            <span class="title">编码:</span>
            <span class="value">${target.options.customData.code}</span>
        </div>
        <div class="row">
            <span class="title">位置:</span>
            <span class="value">${target.options.customData.lng},${target.options.customData.lat}</span>
        </div>
        <div class="row">
            <span class="title">海拔:</span>
            <span class="value">${target.options.customData.height}m</span>
        </div>
      </div>
    `);
  popup.openOn(map);
}
export function closePopup() {
  console.log(popup);
  popup && popup._close();
}
/**
 * 聚焦到多点
 * @param {*} markers
 */
export function setViewMarkers(markers) {
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
export function flyTo(position, zoom = 13) {
  map.flyTo(position, zoom);
}
