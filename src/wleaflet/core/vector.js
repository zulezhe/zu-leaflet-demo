/*
 * @Author: zulezhe
 * @Date: 2022-08-23 21:50:35
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 22:55:23
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
import { Polygon, Polyline,FeatureGroup } from 'leaflet';

export function createVectorLayer(options) {
  let defaultOptions = {
    type: 'polygon',
    latlngs: [
      [
        { lat: 33.582591163939185, lng: 115.53222656250001 },
        { lat: 33.67178278364437, lng: 116.35070800781251 },
        { lat: 33.362649660256665, lng: 116.24908447265626 },
        { lat: 33.390172864722494, lng: 115.82336425781251 },
        { lat: 33.49101671911275, lng: 115.77941894531251 },
        { lat: 33.502468829034314, lng: 115.5596923828125 }
      ]
    ]
  };
  let params = Object.assign(defaultOptions, options);
  let vector;
  switch (params.type) {
    case 'polygon':
      vector = new Polygon(params.latlngs, { color: 'red' });
      break;
    case 'Polyline':
      vector = new Polyline(params.latlngs, { color: 'red' });
      break;
    default:
      break;
  }
  return vector;
}

export function addVectorLayer(vectorLayer) {
  let featureGroup = new FeatureGroup();
  featureGroup.addLayer(vectorLayer);
  featureGroup.addTo(map);
  map.fitBounds(featureGroup.getBounds());
}

export function removeVectorLayer(vectorLayer) {
  // map.removeLayer()
  vectorLayer.remove();
}
