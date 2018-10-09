<template>
    <div class="content">
        <nva-head>
            <li>list</li>
            <li>group</li>
        </nva-head>
        <div>Users {{ $route.params.id }}
            <div>goods {{ $route.params.goodsid }}</div>
        </div>

        <nav-user>
            <span slot="user">张三</span>
            <span slot="age">12</span>
        </nav-user>

    </div>
</template>

<style>
    .content{
        width: 100%;
        height: 500px;
        border: 1px solid red;
        margin: 5px 0;
    }
</style>

<script>
    import NvaHead from '@/views/Head.vue';
    import NavUser from '@/views/User.vue';
export default {
  data () {
      return {
          msg: '第一个项目'
      }
  }, components:{
        NvaHead,NavUser
  }
}
</script>
