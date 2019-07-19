<template>
  <div class="hello">
    <ul>
      <li>
       <router-link to="/foo">
       <i class="iconfont icon-shouye"></i>
       首页
       </router-link>
      </li>
     <li>
       <router-link to="/foo">
       <i class="iconfont icon-zuhao"></i>
       租号
       </router-link>
      </li>
     <li>
       <router-link to="/foo">
       <i class="iconfont icon-fenlei"></i>
       分类
       </router-link>
      </li>
      <li>
       <router-link to="/foo">
       <i class="iconfont icon-my"></i>
       我的
       </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'bottomBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
