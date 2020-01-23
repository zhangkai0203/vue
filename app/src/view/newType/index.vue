<template>
  <van-row>
    <van-col span="5">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
    </van-col>
    <van-col offset="1" span="17">
      <div class="box" v-for="(item,index) in 6" v-if="index == activeKey">{{ item }}</div>
    </van-col>
  </van-row>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        activeKey:0
      }
    }
  }
</script>

<style scoped>
  .box{
    height: 300px;
    margin-top: 10px;
    background-color: aliceblue;
    border-radius: 10px;
  }
</style>
