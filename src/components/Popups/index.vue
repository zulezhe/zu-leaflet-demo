<!--
 * @Author: wangchaoxu
 * @Date: 2021-04-19 16:49:03
 * @LastEditors: zulezhe
 * @LastEditTime: 2021-04-29 10:47:46
 * @Path: https://gitee.com/wangchaoxu/
 * @Description:
-->
<template>
  <div class="popups-container" v-drag :style="{ width: width, height: height, backgroundImage: 'url(' + bgUrl + ')', left: left, top: top }">
    <div class="popups-close" @click="handleClose" v-show="closeIsShow">
      <img src="../../assets/images/close-icon.png" alt="" />
    </div>
    <div class="popups-content">
      <div id="chart"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import { deepObjectMerge } from '@/util';
export default {
  name: 'Wpopups',
  props: {
    width: {
      type: String,
      default: '20%'
    },
    height: {
      type: String,
      default: '30%'
    },
    popUpsShow: {
      type: Boolean,
      default: true
    },
    closeIsShow: {
      type: Boolean,
      default: false
    },
    bgUrl: {
      type: String,
      default: require('@/assets/images/popups-bg.png')
    },
    left: {
      type: String,
      default: '2%'
    },
    top: {
      type: String,
      default: '16%'
    },
    chartsOptions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.hideLoading(false);
      }, 2000);
    });
  },
  methods: {
    handleClose() {
      this.$emit('handleClose', false);
    },
    hideLoading(isShow) {
      this.loading = isShow;
    }
  }
};
</script>
<style scoped lang="less">
.popups-container {
  top: 20%;
  left: 20%;
  .border();
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
  .flex();
  .popups-content {
    width: 96%;
    height: 96%;
    .border();
    #chart {
      .size();
    }
  }
}
</style>
