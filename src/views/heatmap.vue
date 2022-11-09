<!--
 * @Author: zulezhe
 * @Date: 2022-11-09 16:47:17
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-11-09 16:53:23
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
-->
<template>
  <el-button type="primary" size="mini" class="add-button" @click="handleClick">{{ text }}</el-button>
</template>
<script>
import { addHeatMap } from '@/wleaflet/core/layer';
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: '添加热力图'
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      addHeatMap();
    }
  }
};
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
}
</style>
