import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/main'
import home from '@/views/home/view'
import shoplist from '@/views/shoplist/view'
import shopdetails from '@/views/shopdetails/view'
import mine from '@/views/mine/view'
import publish from '@/views/publish/view'
import steptwo from '@/views/steptwo/view'
import logon from '@/views/logon/view'
import partner from '@/views/mineother/partner'
import myaccount from '@/views/mineother/myaccount'
import myincome from '@/views/mineother/myincome'
import newnumber from '@/views/mineother/newnumber'
import suggest from '@/views/mineother/suggest'
import changenum from '@/views/mineother/changenum'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/shoplist/:name',
          name: 'shoplist',
          component: shoplist,
        },
        {
          path: '/mine',
          name: 'mine',
          component: mine
        },
      ]
    },  
    {
      path: '/shopdetails/:id',
      name:'shopdetails',
      component:shopdetails,
    },
    {
      path: '/publish',
      name:'publish',
      component:publish,
    },
    {
      path: '/steptwo',
      name:'steptwo',
      component:steptwo,
    },
    {
      path:'/logon',
      name:'logon',
      component:logon,
    },
    {
      path:'/partner',
      name:'partner',
      component:partner,
    },
    {
      path:'/myaccount',
      name:'myaccount',
      component:myaccount,
    },
    {
      path:'/newnumber',
      name:'newnumber',
      component:newnumber,
    },
    {
      path:'/suggest',
      name:'suggest',
      component:suggest,
    },
    {
      path:'/changenum',
      name:'changenum',
      component:changenum,
    },
    {
      path:'/myincome',
      name:'myincome',
      component:myincome,
    },
    {
      path: '*', redirect: '/main'
    }
  ]
})
