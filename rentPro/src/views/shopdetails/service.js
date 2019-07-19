import http from '@/lib/http';
// import axios from 'axios';
export default {
  getDetails(callback,pms) {
    http.get('api/game/getDetails',{params:pms})
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
