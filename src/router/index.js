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
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // 이 라우트는 인증이 필요하며 로그인 한 경우 확인하십시오.
//     // 그렇지 않은 경우 로그인 페이지로 리디렉션하십시오.
//     if (!store.state['User'].current_user) {
//       next({
//         path: '/login',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // 반드시 next()를 호출하십시오!
//   }
// })

export default router
