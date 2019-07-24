<template>
  <div>
    <Head title="分类" v-bind:num="42" leftArr></Head>

    <van-sidebar v-model="activeKey">
      <van-sidebar-item title="标签名称"/>
      <van-sidebar-item title="标签名称"/>
      <van-sidebar-item title="标签名称"/>
    </van-sidebar>
  </div>
</template>

<script>
  import Head from '@/components/Head';
  export default {
    name: "index",
    components: {Head},
    data() {
      return {
        sta:true,
        num:1234,
        activeKey: 0
      }
    }
  }
</script>

<style scoped>

</style>
