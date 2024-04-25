import { createRouter, createWebHistory } from 'vue-router'

import { checkAuth } from './checkAuth'
import AppLayout from '../layout/AppLayout.vue'
import NotFound from '../views/pages/base/NotFoundView.vue'

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
          component: () => import('../views/pages/home/HomeView.vue'),
        },
        //   конкретная новость
        {
          path: '/news/:id',
          props: true,
          name: 'news',
          component: () => import('../views/pages/SingleNewsView.vue'),
        },
        {
          // просмотр туриков
          path: '/tournaments',
          name: 'tournaments',
          component: () => import('../views/pages/tournament/TournamentsView.vue'),
        },
        {
          // просмотр команд
          path: '/teams',
          name: 'teams',
          component: () => import('../views/pages/team/TeamsView.vue'),
        },
        {
          // просмотр турика по айди
          path: '/tournament/:id',
          props: true,
          name: 'tournament',
          component: () => import('../views/pages/tournament/TournamentView.vue'),
        },
        {
          // просмотр тимы по айди
          path: '/team/:id',
          props: true,
          name: 'team',
          component: () => import('../views/pages/team/TeamView.vue'),
        },
        {
          // просмотр своего профиля
          path: '/profile',
          name: 'profile',
          component: () => import('../views/pages/profile/ProfileView.vue'),
        },
        {
          // редактирование своего профиля
          path: '/self',
          name: 'self-edit',
          component: () => import('../views/pages/profile/UpdateProfileView.vue'),
        },
      ],
    },
    {
      path: '/',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/pages/base/LoginView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/pages/base/RegisterView.vue'),
        },
        {
          path: '/forbidden',
          name: 'forbidden',
          component: () => import('../views/pages/base/AccessView.vue'),
        },
      ],
    },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
})

router.beforeEach(checkAuth)

export default router
