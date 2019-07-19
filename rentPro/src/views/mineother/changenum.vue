<template>
  <div>
    <p>
      <span>
        更换绑定手机
      </span>
      <span class="phone" @click="changeNum">
        13524678769
        <i class="iconfont icon-icon1"></i>
      </span>
    </p>
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
      changeNum(){
        this.$router.push(
          {name: 'changenum', 
          //params: {paicheNo: obj.paicheNo}
        })
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
p{
  padding: 32px;
  font-size:32px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.phone{
  float: right;
  font-size:24px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(153,153,153,1);
}
</style>



