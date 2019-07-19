<template>
  <div class="suggest">
   <div>
     <h2>标题</h2>
     <input class="sugTitle" type="text" v-model="sugTitle"/>
   </div>
   <div>
     <h2>建议或反馈</h2>
     <group>
      <x-textarea v-model="suggest" :max="500" :height="150"
      style="font-size:14px;background:#F5F5F5;"></x-textarea>
    </group>
   </div>
    <div class="submitBtn" @click="submitSug">
     <p>确认提交</p>
    </div> 
  </div>
 
</template>

<script>
  import { Group,XTextarea  } from 'vux';
  export default {
    components: {
      XTextarea ,
      Group,
    },
    // name:'Minelist',
    // components :{
    //   GoodsList,
    // },
    data(){
      return{
        suggest:'',
        sugTitle:'',
      }
    },
    methods:{
      submitSug(){

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
.suggest{
  padding: 0 32px;
}
h2{
  padding: 32px 0;
  font-size:32px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);
}
.sugTitle{
  width:100%;
  height:80px;
  background:#F5F5F5;
  border-radius:8px;
  border: none;
  margin-bottom: 14px;
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



