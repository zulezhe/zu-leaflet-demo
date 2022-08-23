<!--
 * @Author: zulezhe
 * @Date: 2022-08-22 20:24:42
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 20:05:23
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div class="home-container">
    <WMap @mapComplete="mapComplete">
      <WDrawTool :map="map"></WDrawTool>
    </WMap>
    <WTable :tableList="tableList" :loading="loading" :params="params" @currentChange="currentChange" @rowClick="rowClick" />
  </div>
</template>
<script>
import WMap from '@/wleaflet/ui/Map';
import WTable from '@/components/Table';
import WDrawTool from '@/wleaflet/ui/DrawTool';
import { addMarkers, flyTo, clearGroup } from '@/wleaflet/core/marker';
import * as api from '@/api';
export default {
  components: { WMap, WTable, WDrawTool },
  data() {
    return {
      tableList: [],
      loading: true,
      map: null,
      featureGroup: null,
      params: {
        pageNumber: 1,
        pageSize: 5,
        total: 10
      }
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    mapComplete(map) {
      this.map = map;
      console.log('地图加载完成', map);
    },
    getData() {
      this.loading = true;
      api
        .getData(this.params)
        .then(res => {
          this.tableList = res.data;
          this.params.total = res.total;
          this.featureGroup && clearGroup(this.featureGroup);
          this.featureGroup = addMarkers(this.map, this.tableList, {
            icon: {
              iconUrl: require('@/assets/images/1.png'),
              iconSize: [20, 26]
            }
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
    },
    currentChange(val) {
      this.params.pageNumber = val;
      this.getData();
    },
    rowClick(row, column, event) {
      console.log('点击当前行===>', row, column, event);
      flyTo(this.map, [Number(row.lat), Number(row.lng)], 13);
    }
  }
};
</script>
<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
}
</style>
