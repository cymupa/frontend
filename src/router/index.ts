import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '@/views/base/NotFoundView.vue'
import AppLayout from '../layout/AppLayout.vue'

import { disableLoader } from '@/router/loader/disableLoader'
import { setLoader } from '@/router/loader/setLoader'
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
          component: () => import('@/views/home/HomeView/HomeView.vue')
        },
        //   конкретная новость
        {
          path: '/news/:id',
          props: true,
          name: 'news',
          component: () => import('../views/home/SingleNewsView.vue')
        },
        {
          // просмотр туриков
          path: '/tournaments',
          name: 'tournaments',
          component: () =>
            import('@/views/tournament/TournamentsView/TournamentsView.vue')
        },
        {
          // просмотр команд
          path: '/teams',
          name: 'teams',
          component: () => import('@/views/team/TeamsView/TeamsView.vue')
        },
        {
          // просмотр турика по айди
          path: '/tournament/:id',
          props: true,
          name: 'tournament',
          component: () =>
            import('@/views/tournament/TournamentView/TournamentView.vue')
        },
        {
          // просмотр тимы по айди
          path: '/team/:id',
          props: true,
          name: 'team',
          component: () => import('@/views/team/TeamView/TeamView.vue')
        },
        {
          // просмотр своего профиля
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/profile/ProfileView/ProfileView.vue')
        },
        {
          // редактирование своего профиля
          path: '/self',
          name: 'self-edit',
          component: () =>
            import('@/views/profile/UpdateProfileView/UpdateProfileView.vue')
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

router.beforeEach(setLoader)

router.afterEach(disableLoader)

export default router
