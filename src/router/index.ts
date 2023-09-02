import { createRouter, createWebHistory } from 'vue-router'
import deck from '@/views/deck/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: deck
    },
    {
      path: '/home',
      name: 'home',
      component: deck
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: () => import('@/views/deck/bookmark.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/deck/message.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import('@/views/deck/notification.vue')
    },
    {
      //path: '/server/:socket',
      path: '/server',
      name: 'server',
      component: () => import('@/views/deck/server.vue')
    },
    {
      //path: '/server/:socket',
      path: '/thread',
      name: 'thread',
      component: () => import('@/views/deck/thread.vue')
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('@/views/signIn.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    }
  ]
})

export default router
