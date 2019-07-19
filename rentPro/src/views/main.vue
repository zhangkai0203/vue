<template>
  <div>
    <div class="bottombar">
      <ul>
        <li @click="toHome('home')" style="display:block;width: 150px;height: 150px;">
        <!-- <router-link to="/home"> -->
        <img src="../assets/img/home.png" v-if="activeModel !='home'" style="width:100px;height:130px">
        <img src="../assets/img/homeA.png" v-if="activeModel =='home'">
        <!-- <i class="iconfont icon-shouye"></i> -->
        <h3>首页</h3>
        <!-- </router-link> -->
        </li>
      <li @click="toRentList('rent')">
        <!-- <router-link to="/shoplist"> -->
        <img src="../assets/img/zuhao.png" v-if="activeModel !='rent'">
        <img src="../assets/img/zuhaoA.png" v-if="activeModel =='rent'">
        <!-- <i class="iconfont icon-zuhao"></i> -->
        <h3>租号</h3>
        <!-- </router-link> -->
        </li>
      <li @click="toBuyList('buy')">
        <!-- <router-link to="/shoplist"> -->
        <img src="../assets/img/shouhao.png" v-if="activeModel !='buy'">
        <img src="../assets/img/shouhaoA.png" v-if="activeModel =='buy'">
        <!-- <i class="iconfont icon-shou"></i> -->
        <h3>售号</h3>
        <!-- </router-link> -->
        </li>
        <li @click="toMine('mine')">
        <!-- <router-link to="/mine"> -->
        <img src="../assets/img/mine.png" v-if="activeModel !='mine'">
        <img src="../assets/img/mineA.png" v-if="activeModel =='mine'">
        <!-- <i class="iconfont icon-my"></i> -->
        <h3>我的</h3>
        <!-- </router-link> -->
        </li>
      </ul>
    </div>
    <router-view></router-view>

  </div>
  
</template>

<script>
export default {
    data () {
      return {
        activeModel:'home'
      } 
    },
    methods:{
      toHome(val){
        this.$router.push({
          name: 'home',
        });
        this.activeModel = val;
      },
      toRentList(val){
        this.$router.push({
          name: 'shoplist',
          params: {
            name: val
          }
        })
        this.activeModel = val;
      },     
      toBuyList(val){
        this.$router.push({
          name: 'shoplist',
          params: {
            name: val
          }
        })
        this.activeModel = val;
      },
      toMine(val){
        this.$router.push({
          name: 'mine',
        });
        this.activeModel = val;
      },
    }
  }

  


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#aaa;
@colorSign:#ff6e00;
@colorBorder:#ebebeb;

.bottombar{
  height: 80px;
  width: 100%;
  padding-bottom: 12px;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
  position: fixed;
  bottom: 0;
  z-index: 499;
  background-color: #fff;
  a{
    color: #999;
    display: inline-block;
  }
  li{
    float: left;
    width: 25%;
    text-align: center;
    img{
      width: 36px;
      height: 36px;
    }
    h3{
      line-height: 20px;
      margin-top: -24px;
    }
  }
}
</style>



