import axios from 'axios';
import qs from 'qs'

axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d03831c6b9636570e8bf74c/user';
axios.defaults.timeout = 3000;

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data.data);
    }).catch(err => {
      reject(err)
    })
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err =>{
        reject(err)
      })
  });
}
