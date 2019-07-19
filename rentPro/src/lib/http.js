import axios from 'axios';
import qs from 'qs'
axios.defaults.baseURL = 'http://39.98.206.162/';
// axios.defaults.baseURL = '/api/game';
// axios.defaults.baseURL = 'http://192.168.6.201:20000/'
//设置默认请求头
// axios.defaults.headers = {
  //'X-Requested-With': 'XMLHttpRequest',
  // 'Authorization': 'Bearer '+localStorage.token
  //'Authorization':'Basic YXZjZGF0YTpuZXcuMTIzNA=='
// }
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000;
// http request 请求拦截器
axios.interceptors.request.use(
  config => {
    // config.headers['Authorization'] = getToken()
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // let data = config.data
      // 序列化
      config.data = qs.stringify(config.data);
    }
    if (config.method === 'get') {
      let data = config.params;
      // return then(result => {
      //   config.params = result;
      //   return config;
      // })
    }
    // console.log(localStorage)
    // if(sessionStorage.token){
    //   config.headers.Authorization = sessionStorage.token
    //   // config.headers.Authorization = 'Basic YXZjZGF0YTpuZXcuMTIzNA=='
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 返回拦截器
// axios.interceptors.response.use(
//   response => {
//     // if (response.data.errCode == 2) {
//     //   router.replace({
//     //     path: "/login",
//     //     querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
//     //   })
//     // }
//     // return response;
//   },
//   error => {
//     // if (error.response) {
//     //   switch (error.response.status) {
//     //     case 401:
//     //       sessionStorage.clear();
//     //       Notice.info({
//     //         desc: '权限错误，请重新登陆。'
//     //       });
//     //       // router.replace({
//     //       //   path: '/login',
//     //       //   query: { redirect: router.currentRoute.fullPath }
//     //       // });
//     //     case 500 || 405:
//     //       Notice.info({
//     //         desc: '服务器错误，请稍后再试。'
//     //       });
//     //   }
//     // } else {
//     //   return Promise.reject(error)
//     // }

//   }
// );
export default axios;
