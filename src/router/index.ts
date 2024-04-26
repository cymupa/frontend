import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '@/views/base/NotFoundView.vue'
import AppLayout from '../layout/AppLayout.vue'
import { checkAuth } from './checkAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home/HomeView.vue')
        },
        //   конкретная новость
        {
          path: '/news/:id',
          props: true,
          name: 'news',
          meta: { transition: 'slide-left' },
          component: () => import('../views/home/SingleNewsView.vue')
        },
        {
          // просмотр туриков
          path: '/tournaments',
          name: 'tournaments',
          meta: { transition: 'slide-left' },
          component: () => import('@/views/tournament/TournamentsView.vue')
        },
        {
          // просмотр команд
          path: '/teams',
          name: 'teams',
          meta: { transition: 'slide-left' },
          component: () => import('@/views/team/TeamsView.vue')
        },
        {
          // просмотр турика по айди
          path: '/tournament/:id',
          props: true,
          name: 'tournament',
          meta: { transition: 'slide-left' },
          component: () => import('@/views/tournament/TournamentView.vue')
        },
        {
          // просмотр тимы по айди
          path: '/team/:id',
          props: true,
          name: 'team',
          meta: { transition: 'slide-left' },
          component: () => import('@/views/team/TeamView.vue')
        },
        {
          // просмотр своего профиля
          path: '/profile',
          name: 'profile',
          meta: { transition: 'slide-left' },
          component: () => import('@/views/profile/ProfileView.vue')
        },
        {
          // редактирование своего профиля
          path: '/self',
          name: 'self-edit',
          component: () => import('@/views/profile/UpdateProfileView.vue')
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/base/LoginView.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/base/RegisterView.vue')
        },
        {
          path: '/forbidden',
          name: 'forbidden',
          component: () => import('@/views/base/AccessView.vue')
        }
      ]
    },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
  ]
})

router.beforeEach(checkAuth)
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})
export default router
