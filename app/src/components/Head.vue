<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-arrow="leftArr"
      :left-text="leftText"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>

</template>

<script>
  export default {
    name: "Head",
    props: {
      title: String,
      leftText: String,
      rightText: String,
      leftArr: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onClickRight() {
        Toast('按钮');
      }
    }
  }
</script>

<style scoped>

</style>
