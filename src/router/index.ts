import { createRouter, createWebHistory } from 'vue-router'
import deck from '@/views/deck.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: deck
    },
    {
      path: '/signIn',
      name: 'CreateAccount',
      component: () => import('../views/signIn.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
})

export default router
