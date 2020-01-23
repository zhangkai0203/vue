<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/type">课程</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/vip">VIP</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/cart">社区</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
    export default {
        name: "Tabbar",
        data(){
          return {
            active:0
          }
        },
        mounted() {
          switch (this.$route.path) {
            case '/':
              this.active = 0
              break;
            case 'list':
              this.active = 1
              break;
            case 'cart':
              this.active = 2
              break;
            default:
              this.active = 0
              break;
          }
        }
    }
</script>

<style scoped>

</style>
