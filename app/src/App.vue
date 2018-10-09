<template>
  <div id="app">
     <div class="head">head</div>
    <router-view/>

     <div class="footer">footer</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .head,.footer{
    width: 100%;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: 1px solid red;
  }
</style>
