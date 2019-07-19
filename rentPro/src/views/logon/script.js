import service from "@/api/login";
import Vue from 'vue';
import axios from 'axios';
import { Group,XTextarea  } from 'vux';
import { Uploader,Image,Picker,Popup,Icon,Field,CellGroup,Toast} from 'vant';

Vue.use(Uploader).use(Image).use(Picker).use(Popup).use(Icon).use(Field).use(CellGroup).use(Toast);

export default {
    components: { Popup, XTextarea , Group, Icon },
    data () {
      return {
        telNum:'',
        imgCaptcha:'',
        captcha:'',
        capShow:true,
        imgShow:false,
        telShow:false,
        countTime:'',
        timer:null,
        imgSrc:'',
      } 
    },
    methods:{ 
        //手机号码
        getImgCaptcha(e){
          let reg = /^1[0-9]{10}$/
          if (this.telNum == '' || this.telNum.length <= 10 || !reg.test(this.telNum)) {
              this.telShow = true;
              return false
          }else{
            this.telShow = false;
            this.changeImg()
          }
        },
        //图形验证码
        changeImg(){
          var pms={
            phone:this.telNum
            // phone:1
          }
          axios.get('api/user/getCaptcha', {
              params: pms,
              responseType: 'arraybuffer'
          }).then(response => {
              return 'data:image/png;base64,' + btoa(
              new Uint8Array(response.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
          }).then(data => {
            this.imgShow = true;
            this.imgSrc = data;
          })
        },
        //发送短信验证码
        getCode(){
          let _this = this;
          if( !_this.telNum || !_this.imgCaptcha){
            Toast('请完整填写手机号及验证信息');
            return
          }
          let pms = {
            code : _this.imgCaptcha,
            mobile : _this.telNum
          }
          //开始登录
          service.sendTel(function(data){
            if(data.code ==0){
              Toast(data.msg);
              _this.getImgCaptcha();
            }else{
               this.getTime()
            }
          },pms)
        },
        //短信验证码倒计时
        getTime(){
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.countTime = TIME_COUNT;
            this.capShow = false;
            this.timer = setInterval(() => {
              if (this.countTime > 0 && this.countTime <= TIME_COUNT) {
                this.countTime--;
              } else {
                this.capShow = true;
                clearInterval(_this.timer);
                this.timer = null;
              }
            }, 1000)
          }
        },
        //登录
        logon(){
          let _this = this;
          if( !_this.telNum || !_this.imgCaptcha || !_this.captcha){
            return
          }
          let pms = {
            captcha : _this.captcha,
            mobile : _this.telNum
          };
          service.login(function(data){
            if(data.code == 1){
              window.localStorage.setItem('token',data.data.userinfo.token);
              window.localStorage.setItem('user',JSON.stringify(data.data.userinfo));
              _this.$router.push('/mine');
            }else{
              Toast(data.msg);
            }
          },pms)
        }
    }
  }

