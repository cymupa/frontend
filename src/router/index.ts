import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

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
          component: () => import('@/views/HomeView/HomeView.vue'),
        },
        //   конкретная новость
        {
          path: '/:id',
          name: 'news',
          component: () => import('@/views/pages/News.vue'),
        },
        {
          // просмотр туриков
          path: '/tournaments',
          name: 'tournaments',
          component: () => import('@/views/pages/TournamentsView.vue'),
        },
        {
          // просмотр команд
          path: '/teams',
          name: 'teams',
          component: () => import('@/views/pages/TeamsView.vue'),
        },
        {
          // просмотр турика по айди
          path: '/tournament/:id',
          name: 'tournament',
          component: () => import('@/views/pages/TournamentView.vue'),
        },
        {
          // просмотр тимы по айди
          path: '/team/:id',
          name: 'team',
          component: () => import('@/views/pages/TeamView.vue'),
        },
        {
          // просмотр своей тимы
          path: '/team',
          name: 'team',
          component: () => import('@/views/pages/TeamView.vue'),
        },
        {
          // просмотр своего профиля
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/pages/ProfileView.vue'),
        },
        {
          // редактирование своего профиля
          path: '/self',
          name: 'self-edit',
          component: () => import('@/views/pages/UpdateProfileView.vue'),
        },
      ],
    },
    {
      path: '/',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/pages/auth/Login.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/pages/auth/Login.vue'),
        },
        {
          path: '/forbidden',
          name: 'forbidden',
          component: () => import('@/views/pages/auth/Access.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'notfound',
          component: () => import('@/views/pages/NotFound.vue'),
        },
      ],
    },
  ],
})

export default router
