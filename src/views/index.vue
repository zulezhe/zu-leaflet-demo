<template>
  <div class="home-container">
    <WMap></WMap>
  </div>
</template>
<script>
import WMap from '@/components/Map';
export default {
  components: { WMap },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
}
</style>
