<template>
  <div class="account">
    <h1>我的余额</h1>
    <div class="moneyW">
      <span class="moneyNum"><strong>30.00</strong> 元</span>
    </div>
    <div>
      <h3>选择充值余额</h3>
      <div class="gameBanner">
        <van-row gutter="8" style="margin-bottom:8px;">
          <van-col span="8">
            <span class="depositNum" :class="depositNum==5 ? 'active':'' " @click="depositCheck(5)"><strong>5</strong> 元</span>
          </van-col>
          <van-col span="8">
            <span class="depositNum" :class="depositNum==20 ? 'active':'' " @click="depositCheck(20)"><strong>20</strong> 元</span>
          </van-col>
          <van-col span="8">
            <span class="depositNum" :class="depositNum==50 ? 'active':'' " @click="depositCheck(50)"><strong>50</strong> 元</span>
          </van-col>
        </van-row>
        <van-row gutter="8">
          <van-col span="8">
            <span class="depositNum" :class="depositNum==100 ? 'active':'' " @click="depositCheck(100)"><strong>100</strong> 元</span>
          </van-col>
          <van-col span="8">
            <span class="depositNum" :class="depositNum==200 ? 'active':'' " @click="depositCheck(200)"><strong>200</strong> 元</span>
          </van-col>
          <van-col span="8">
            <span class="depositNum" :class="depositNum==500 ? 'active':'' " @click="depositCheck(500)"><strong>500</strong> 元</span>
          </van-col>
        </van-row>
      </div>
    </div>
     <div class="submitBtn" @click="deposit">
      <p>确认充值</p>
    </div>
  </div>
 
</template>

<script>
import Vue from 'vue';
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
  export default {
    // name:'Minelist',
    // components :{
    //   GoodsList,
    // },
    data(){
      return{
        depositNum:'',
      }
    },

    methods:{
      depositCheck(val){
        this.depositNum = val;
      },
      deposit(){

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
.account{
  padding: 0 32px;
}
h1{
  padding: 32px 0;
  font-size:40px;
  font-family:PingFangSC-Medium;
  font-weight:500;
}
.moneyW{
  width:686px;
  height:240px;
  background:rgba(251,223,24,1);
  border-radius:16px;
  vertical-align: middle;
  display: table-cell;
  text-align: center;
  margin-bottom: 28px;
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
}
h3{
  padding: 28px 0;
  font-size:32px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(153,153,153,1);
}
.active{
  background-color:#FFFBE2; 
}
.depositNum{
  display: inline-block;
  width:218px;
  height:144px;
  line-height: 144px;
  border-radius:12px;
  border:1px solid rgba(215,215,215,1);
  text-align: center;
  font-size:20px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(61,67,69,1);
  strong{
    font-size:40px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(61,67,69,1);
    line-height:56px;
  }
}
.submitBtn{
  background-color: #fff;
  position: fixed;
  bottom: 96px;
  p{
    width:686px;
    height:84px;
    background:rgba(251,223,24,1);
    border-radius:8px;
    line-height: 84px;
    text-align: center;
    font-size:32px;
    font-weight:500;
  }
} 

</style>



