# leaflet demo

## 技术栈

+ vue2.x
+ vue-cli
+ leaflet 1.7.1
+ @supermap/iclient-leaflet 11.0.0

## 需求和思路

+ 分页展示模拟数据 ✔

+ 模拟数据渲染到地图 ✔

+ 翻页清除地图数据重新渲染 ✔

+ 鼠标移入显示点位名称 ✔

+ 鼠标点击点显示详细信息✔

+ 点击列表定位点位 ✔

+ 点击按钮,地图上模拟显示面和线 ✔

+ 点高亮或者闪烁 

+ 模拟数据,点位平滑移动 ✔

+ 通过canvas模拟10000个测试点加载到地图

+ 通过canvas模拟5000个标签加载到地图,并实现标签避让

+ 平滑路径移动

[leaflet.motion](https://github.com/Igor-Vladyka/leaflet.motion)

+ 绘制工具

[leaflet-geoman](https://github.com/geoman-io/leaflet-geoman)

## 两点

## 遇到的问题

+ 1. @supermap/iclient-leaflet 11.0.0 不支持leaflet最新版(v1.8.0),默认安装leaflet后运行会摆错,但是官网文档并没有指出来

+ Error: The provided object is not a Layer.

使用 layerGroup添加多个点的时候我这样使用会报上述错误

```js
let markers = list.map(item => addMarker(item));
layerGroup.addLayer(markers).addTo(map)
```

我这样就不会报错

```js
  let layerGroup = L.layerGroup();
  list.map(item => {
    layerGroup.addLayer(addMarker(item));
  });
  layerGroup.addTo(map);
```
