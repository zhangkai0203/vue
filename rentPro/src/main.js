// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import lrz from 'lrz'

//import 'vant/lib/index.css';
// import VueTouch from 'vue-touch'
// import WeVue from 'we-vue'
// import 'we-vue/lib/style.css

const FastClick = require('fastclick')
Vue.prototype.imgSrc = "http://img.zushouyou.cn"
FastClick.attach(document.body);
Vue.config.productionTip = false;

// Vue.use(VueTouch, {name: 'v-touch'})
// Vue.use(WeVue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
