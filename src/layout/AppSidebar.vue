<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

import type { MenuGroup } from './types'

import AppMenuItem from './AppMenuItem.vue'

const { state } = storeToRefs(useUserStore())
const { isLoggedIn } = storeToRefs(useAuthStore())

const model: MenuGroup[] = reactive([
  {
    label: 'Общее',
    items: [
      { label: 'Лента новостей', icon: 'pi pi-sparkles', to: '/' },
      { label: 'Список турниров', icon: 'pi pi-trophy', to: '/tournaments' },
      { label: 'Список команд', icon: 'pi pi-users', to: '/teams' }
    ]
  }
])

const auth: MenuGroup[] = reactive([
  {
    label: 'Личное',
    items: [
      { label: 'Мой профиль', icon: 'pi pi-user', to: '/profile' },
      { label: 'Настройки', icon: 'pi pi-cog', to: '/self' }
    ]
  }
])

const unauth: MenuGroup[] = reactive([
  {
    label: 'Для гостя',
    items: [
      { label: 'Вход', icon: 'pi pi-sign-in', to: '/login' },
      { label: 'Регистрация', icon: 'pi pi-user-plus', to: '/register' }
    ]
  }
])

onMounted(() => {
  if (state.value.data.teamId) {
    const newItem = { label: 'Моя команда', icon: 'pi pi-home', to: '/team/1' }

    auth[0].items.splice(1, 0, newItem)
  }
})
</script>

<template>
  <ul class="layout-menu" v-for="(item, i) in model" :key="item.label">
    <app-menu-item :item="item" :index="i" />
  </ul>

  <ul v-if="isLoggedIn" class="layout-menu" v-for="(item, i) in auth" :key="item.label">
    <app-menu-item :item="item" :index="i" />
  </ul>

  <ul v-else class="layout-menu" v-for="(item, i) in unauth" :key="i">
    <app-menu-item :item="item" :index="i" />
  </ul>
</template>

<style lang="scss" scoped></style>
