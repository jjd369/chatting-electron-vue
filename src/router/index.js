import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/components/layout'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/userList',
        name: 'userList',
        component: () => import('@/components/layout/userList'),
      },
      {
        path: '/chatList',
        name: 'chatList',
        component: () => import('@/components/layout/chatList'),
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/components/layout/chat'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login'),
  },
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 500 }
    }
  }
})
export default router
