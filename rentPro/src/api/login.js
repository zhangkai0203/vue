import http from '@/lib/http';
export default {
  //请求图形验证码
  getCaptcha(callback,pms) {
    http.post('api/user/getCaptcha',pms)
      .then(function (response) {
        callback(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // 发送手机号接口
  sendTel(callback,pms) {
    http.post('api/sms/send',pms)
      .then(function (response) {
        callback(response.data)
      })
      .catch(function (error) {
         console.log(error)
      })
  },
  //登录接口
  login(callback,pms) {
    http.post('api/user/mobilelogin',pms)
      .then(function (response) {
        callback(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}



