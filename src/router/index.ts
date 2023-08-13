import { createRouter, createWebHistory } from 'vue-router'
import deck from '@/views/deck/home.vue'
import account from '@/layouts/account.vue'
import about from '@/layouts/about.vue'
import AppLayout from '@/layouts/app.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      meta: { layout: AppLayout },
      component: deck
    },
    {
      path: '/home',
      name: 'home',
      meta: { layout: AppLayout },
      component: deck
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      meta: { layout: AppLayout },
      component: () => import('@/views/deck/bookmark.vue')
    },
    {
      path: '/message',
      name: 'message',
      meta: { layout: AppLayout },
      component: () => import('@/views/deck/message.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      meta: { layout: AppLayout },
      component: () => import('@/views/deck/notification.vue')
    },
    {
      //path: '/server/:socket',
      path: '/server',
      name: 'server',
      meta: { layout: AppLayout },
      component: () => import('@/views/deck/server.vue')
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('@/views/signIn.vue'),
      meta: { layout: account }
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: account },
      component: () => import('@/views/login.vue')
    }
  ]
})

export default router
