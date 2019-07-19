<template>
  <div>
    <div class="banner">
      <img src="../../assets/img/logo.png"/>
    </div>
    <div class="textWrap">
        <h2>合作要求</h2>
        <p>手里有最少10个账号即可成为商家做老板，与租手游官方签订线下合作合同。</p>
        <p>我们将在分成比例，排名等方面给你优越的条件，让您在家做商家也可以月入万元。</p>
        <p>
          <span>具体联系微信:</span><strong ref='copyT'>1245639</strong> 
          <span class="copy" @click="copy()">复制</span>
        </p>
        
    </div>
    
  </div>
  
</template>

<script>
  import Clipboard from 'clipboard';
  export default {
    //name:'Minelist',
    // components :{
    //   GoodsList,
    // },
    data(){
      return{

      }
    },
    methods:{
      copy() {
        var text = this.$refs.copyT.innerHTML;
        var clipboard = new Clipboard('.copy', {
            text: function() {
                return text;
            }
        });
        clipboard.on('success', e => {
          alert('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          alert('该浏览器不支持自动复制!')
          // 释放内存
          clipboard.destroy()
        })
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
.banner {
  width:100%;
  height:436px;
  background:#FBDF18;
  position: relative;
}
.banner img {
  height: 360px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.textWrap {
  padding: 16px 32px 0;
  h2{
    padding:32px 0;
    font-size:40px;
    font-family:PingFangSC-Medium;
    font-weight:500;
  }
  p{
    font-size:28px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-bottom: 40px;
  }
}
.copy{
  display: inline-block;
  width:74px;
  height:36px;
  margin-left: 12px;
  border-radius:18px;
  border:1px solid rgba(102,102,102,1);
  font-size:22px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:36px;
  text-align: center
}
</style>



