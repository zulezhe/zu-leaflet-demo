<!--
 * @Author: zulezhe
 * @Date: 2022-08-22 20:24:42
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 00:42:05
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div class="home-container">
    <WMap @mapComplete="mapComplete" />
    <WTable :tableList="tableList" :loading="loading" :params="params" @currentChange="currentChange" @rowClick="rowClick" />
  </div>
</template>
<script>
import WMap from '@/components/Map';
import WTable from '@/components/Table';
import * as api from '@/api';
export default {
  components: { WMap, WTable },
  data() {
    return {
      tableList: [],
      loading: true,
      map:null,
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
