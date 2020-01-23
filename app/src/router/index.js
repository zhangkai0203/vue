import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/home')        //主页
    },
    {
      path: '/type',
      name: 'type',
      component: () => import('@/view/type')         //课程
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import('@/view/vip')          //vip
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/view/community')    //社区
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/view/user')          //我的
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/view/list')
    },
    {
      path:'/newType',
      name:'newType',
      component: () => import('@/view/newType/index')
    }
  ]
})
