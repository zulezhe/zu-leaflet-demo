<!--
 * @Author: zulezhe
 * @Date: 2022-08-22 23:09:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 00:36:13
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <div class="wcx-table-container">
    <div class="wcx-table-fold" @click="handdleFold">
      <img :class="isOpen ? 'open' : ''" :src="require('@/assets/icon/up.svg')" alt="" />
    </div>
    <div class="wcx-table-content" :class="[isOpen ? 'open' : '']">
      <el-table :data="tableList" style="width: 100%" v-loading="loading" @row-click="rowClick">
        <el-table-column type="设置类型" prop="name" label="名称"> </el-table-column>
        <el-table-column type="设置类型" prop="province" label="所属省份"> </el-table-column>
        <el-table-column type="设置类型" label="编码" prop="code"> </el-table-column>
        <el-table-column type="设置类型" label="经度" prop="lat"> </el-table-column>
        <el-table-column type="设置类型" label="纬度" prop="lng"> </el-table-column>
        <el-table-column type="设置类型" label="海拔" prop="height"> </el-table-column>
      </el-table>
      <el-pagination :page-size="params.size" :current-page="params.pageNumber" layout="prev, pager, next" :total="params.total" @current-change="currentChange"> </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          pageNumber: 1,
          total: 10
        };
      }
    },
    tableList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {
      isOpen: true
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    currentChange(val) {
      this.$emit('currentChange', val);
    },
    handdleFold() {
      this.isOpen = !this.isOpen;
    },
    rowClick(row, column, event) {
      this.$emit('rowClick', row, column, event);
    }
  }
};
</script>
<style scoped lang="less">
.wcx-table-container {
  position: fixed;
  z-index: 9999;
  width: 100%;
  background-color: #fff;
  bottom: 0;
  .wcx-table-fold {
    width: 50px;
    height: 30px;
    border-radius: 8px 8px 0 0;
    border: 1px solid #aaa;
    border-bottom: 0;
    background-color: #fff;
    cursor: pointer;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      transition: all 0.5s ease-in-out;
      &.open {
        transform: rotate(180deg);
      }
    }
  }
  .wcx-table-content {
    width: 100%;
    border: 1px solid #aaa;
    background-color: #fff;
    transition: all 0.5s ease-in-out;
    &.open {
    }
  }
}
</style>
