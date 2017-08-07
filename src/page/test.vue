<template>
  <div class="content" flex="main:center cross:center">
    清理缓存成功
  </div>
</template>
<script>
import { clearStore } from 'src/config/mUtils'
import * as Api from 'src/afford/api'
export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    this.clearLocalStorge();
    Api.log(`清理缓存成功`)
  },
  methods: {
    clearLocalStorge() {
      clearStore();
    }
  }
}
</script>
<style>
.content{
  width: 100%;
  height: 4.5rem;
}
</style>
