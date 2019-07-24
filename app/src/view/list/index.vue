<template>
  <div>
    <Head title="分类" v-bind:num="42" leftArr></Head>
    <div class="content">
      <div class="box-left">
        <ul>
          <li v-for="(item,index) in 10" :class="{active:selectId === index}" @click="liClick(index)">{{ item }}</li>
        </ul>
      </div>
      <div class="box-right">
        <div v-for="item in 10" class="box">{{ item }}</div>
      </div>
    </div>
  </div>

</template>

<script>
  import Head from '@/components/Head';
  import {getList} from '../../api/user'

  export default {
    name: "index",
    components: {Head},
    data() {
      return {
        selectId: 0
      }
    },
    mounted() {
      var _this = this;
      var boxRight = document.querySelector(".box-right");
      var box = document.querySelectorAll(".box");
      var boxLeft = document.querySelector(".box-left");

      boxRight.addEventListener('scroll', function () {

        var top = this.scrollTop;              //滚动的高度
        var rightH = boxRight.scrollHeight      //滚动的总高度
        var ht = boxRight.offsetHeight          //高度

        for (let i = 0; i <= box.length; i++) {


          //boxLeft.scrollTop = i * (40/2);

          //console.log(i * (45/2))

          //判断是否到达底部
          if ((top + ht) == rightH) {
            console.log("到底了。。")
            _this.selectId = box.length-1;
            boxRight.scrollTop = rightH;
            return;
          }
          //判断是否到头部
          if(top == 0){
            console.log("到头了。。")
            _this.selectId = i;
            boxLeft.scrollTop = 0;
            return;
          }

          //切换左侧导航
          if (box[i].offsetTop >= top) {
            _this.selectId = i;
            return;
          }
        }
      })
    },
    methods: {
      liClick(num) {
        this.selectId = num;

        let box = document.querySelectorAll(".box")[0];
        let height = box.offsetHeight;

        document.querySelector(".box-right").scrollTop = height * num;
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: 200px;
  }

  .box-left {
    width: 19%;
    height: 100%;
    float: left;
    overflow-y: auto;
  }

  .box-left li {
    width: 95%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border: 1px salmon solid;
  }

  .active {
    background-color: seagreen;
  }

  .box-right {
    width: 80%;
    height: 100%;
    float: right;
    overflow-x: scroll;
    white-space: nowrap;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }

  .box-right .box {
    width: 99%;
    height: 100px;
    margin-bottom: 5px;
    border: 1px seagreen solid;
  }
</style>
