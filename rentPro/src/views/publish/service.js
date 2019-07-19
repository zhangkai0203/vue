import http from '@/lib/http';
export default {
  //列表
  list(callback,pms) {
    http.get('api/game/getGameCategoryList',{params:pms})
    .then(function (response) {
        callback(response.data.data)
    })
    .catch(function (error) {
       console.log(error);
    })
//     http.post('/getGameCategoryList/')
//       .then((res)=>{
//           console.log(res)
//         callback(res)
//       }).catch((err) => {
//       console.info(err)
//     })
  },
  gameSelList(callback,pms) {
    http.get('api/game/getGameCategoryList',{params:pms})
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
