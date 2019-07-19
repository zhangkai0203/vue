<template>
  <div>
    <h1>我的收入</h1>
    <div class="wrap">
      <span class="moneyNum">
        <strong>30.00</strong> 元
      </span>
      <span @click="getMoney" class="getmoney">提现</span>
    </div>
  </div>
</template>
<script>
  export default {
    // name:'Minelist',
    // components :{
    //   GoodsList,
    // },
    data(){
      return{

      }
    },
    methods:{
      getMoney(){

      }
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
h1{
  padding: 32px;
  font-size:40px;
  font-family:PingFangSC-Medium;
  font-weight:500;
}
.wrap{
  margin: 0 32px;
  padding-left: 40px;
  width:654px;
  height:240px;
  line-height: 240px;
  background:rgba(251,223,24,1);
  border-radius:16px;
}
.moneyNum{
  font-size:28px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(61,67,69,1);
  strong{
    font-size:68px;
    font-family:DINAlternate-Bold;
    font-weight:bold;
    color:rgba(61,67,69,1);
  }
}
.getmoney{
  display: inline-block;
  float: right;
  margin-top: 88px;
  margin-right: 32px;
  width:144px;
  height:64px;
  line-height: 64px;
  background:rgba(61,67,69,1);
  border-radius:32px;
  text-align: center;
  font-size:28px;
  font-weight:500;
  color:rgba(251,223,24,1);
}
</style>



