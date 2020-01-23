<template>
  <div>
    <Head title="首页"></Head>

    <van-tabs v-model="active" sticky>
      <van-tab v-for="(item,index) in tabList" :title="item.name" :key="index">

        <van-list v-model="loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="it in item.list" :key="it" :title="it"/>
        </van-list>

      </van-tab>
    </van-tabs>

    <Tabbar></Tabbar>

  </div>
</template>

<script>
  import Head from '@/components/Head';
  import Tabbar from '@/components/Tabbar'

  export default {
    name: "Home",
    components: {Tabbar,Head},
    data() {
      return {
        active: 0,
        tabList: [
          {
            name: '推荐',
            page: 0,
            list: [],
            finished: false
          },
          {
            name: '热门',
            page: 0,
            list: [],
            finished: false
          },
          {
            name: '精品',
            page: 0,
            list: [],
            finished: false
          },
        ],
        loading: false,
      }
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {

          let index = this.active;

          for (let i = 0; i < 10; i++) {
            //this.list.push(this.list.length + 1);
            let len = this.tabList[index].list.length + 1
            let data = len + this.tabList[index].name;
            this.tabList[index].list.push(data)
          }
          //页面加1
          this.tabList[index].page += 1;

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.tabList[index].page >= 10) {
            this.tabList[index].finished = true;
          }
        }, 500);
      }
    }
  }
</script>

<style scoped>

</style>
