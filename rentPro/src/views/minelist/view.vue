<template>
  <div>
    <van-tabs v-model="active" sticky :offset-top= "top" @click="getHotList">
      <van-tab v-for="item in bannerListAll" :title="item.name" :key="item.id">
        <ul class="goodsLists">
          
        </ul>
      </van-tab>
    </van-tabs>  
  </div>
  
</template>

<script>
//
  import { Tab, Tabs } from 'vant';
  Vue.use(Tab).use(Tabs);
  import GoodsList from './components/GoodsList'
  export default {
    name:'Minelist',
    components :{
      GoodsList,
    },
    data(){
      return{

      }
    },
    methods:{

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

</style>



