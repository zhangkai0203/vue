import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/views/Demo'

Vue.use(Router);

export default new Router({
    mode:'history',
  routes: [
    {
      path: '/',
      name: 'demo',
      component: Demo
    },
      {
          path:'/user/:id/goods/:goodsid',
          name:'demo',
          component: Demo
      }
  ]
})
