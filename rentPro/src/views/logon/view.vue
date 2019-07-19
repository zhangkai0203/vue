<template>
    <div class="logon">
        <div class="title">
           <h1>欢迎来到租手游</h1>
           <h3>首次注册送2元余额</h3>
        </div>
        <div class="inputWrap">
            <ul>
                <li class="tel">
                   <input type="tel" placeholder="请输入手机号" v-model="telNum" @blur="getImgCaptcha" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11"/> 
                    <span v-show="telShow" style="color:red;">请输入正确的手机号</span>
                </li>
                <li class="getCode">
                   <input placeholder="请输入验证码" v-model="imgCaptcha" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="4"/> 
                   <img v-show="imgShow" :src="imgSrc" @click="changeImg"/>
                </li>
                <li class="sendCode">
                   <input placeholder="请输入验证码" maxlength="4" v-model="captcha"/>
                   <span v-show="capShow" @click="getCode">获取验证码</span>
                   <span v-show="!capShow">倒计时{{countTime}}秒</span>
                </li>
            </ul>
        </div>
      
        <div class="logonBtn">
            <p @click="logon">登录</p>
        </div>
    
    </div>
</template>

<script>
  import script from "@/views/logon/script";
  export default script;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#aaa;
@colorSign:#ff6e00;
@colorBorder:#ebebeb;
@colorBtn:rgba(251,223,24,1);
.logon{
  padding-left: 48px;
}
.title{
  margin-top: 224px;
  margin-bottom: 16px;
h1{
  font-size:48px;
  font-weight:500;
  line-height:66px;
  margin-bottom: 8px;
}
h3{
  font-size:28px;
  font-weight:400;
  color:#666666;
  line-height:40px;
}
}
.inputWrap{
  margin-bottom: 112px;
  li{
    height: 104px;
    border-bottom: 2px solid #F2F2F2;
    padding-right: 48px;
    padding-top:48px;
  }
  input{
    border: none;
    height: 92px;
    line-height: 92px;
    width: 60%;
    font-size: 28px;
  }
  input::-webkit-input-placeholder{
    color:#BDBDBD;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#BDBDBD;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#BDBDBD;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#BDBDBD;
  }
  img{
    float: right;
    margin-top: 20px;
    width:192px;
    height:60px;
  }
  span{
    float: right;
    margin-top: 32px;
    font-size:28px;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
}
.logonBtn{
  background-color: #fff;
  p{
    width:654px;
    height:84px;
    background:rgba(251,223,24,1);
    border-radius:8px;
    line-height: 84px;
    text-align: center;
    border-radius:48px;
  }
}
 
</style>



