import http from '@/lib/http';
import axios from 'axios';
export default {
  //列表
  list(callback,pms) {
    http.get('api/game/getGameGoodsList',{params:pms})
    .then(function (response) {
      // console.log(response)
        callback(response.data)
    })
    .catch(function (error) {
       console.log(error);
    })
    // axios.post('api/game/getGameGoodsList', pms)
    //   .then((res)=>{
    //     console.log(res)
    //     callback(res.data)
    //   }).catch((err) => {
    //   console.info(err)
    // })
//     http.post('/getGameCategoryList/')
//       .then((res)=>{
//           console.log(res)
//         callback(res)
//       }).catch((err) => {
//       console.info(err)
//     })
  },
 getGameBanner(callback) {
    http.get('api/game/getGameCategoryList')
    .then(function (response) {
      // console.log(response)
      callback(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  getBanner(callback) {
    http.get('api/game/getBanner')
    .then(function (response) {
      // console.log(response)
      callback(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  //用户名是否存在
//   checkName(pms,callback) {
//     http.post('api/user/check/username', pms)
//       .then((res)=>{
//         callback(res.data)
//       }).catch((err) => {
//       console.info(err)
//     })
//   },
}
