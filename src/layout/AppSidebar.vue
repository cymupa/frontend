<script setup lang="ts">
import { reactive } from 'vue'

import AppMenuItem from './AppMenuItem.vue'
import type { MenuGroup } from './types'

const model: MenuGroup[] = reactive([
  {
    label: 'Общее',
    items: [
      { label: 'Лента новостей', icon: 'pi pi-sparkles', to: '/' },
      { label: 'Список турниров', icon: 'pi pi-trophy', to: '/tournaments' },
      { label: 'Список команд', icon: 'pi pi-users', to: '/teams' }
    ]
  },
  {
    label: 'Личное',
    // TODO: add team id from store
    items: [
      { label: 'Мой профиль', icon: 'pi pi-user', to: '/profile' },
      { label: 'Моя команда', icon: 'pi pi-home', to: '/team/1' },
      { label: 'Настройки', icon: 'pi pi-cog', to: '/self' }
    ]
  },
  {
    label: 'FOR TESTS',
    items: [
      { label: 'login', icon: 'pi pi-fw pi-id-card', to: '/login' },
      { label: 'register', icon: 'pi pi-fw pi-id-card', to: '/register' }
    ]
  }
])
</script>

<template>
  <ul class="layout-menu" v-for="(item, i) in model" :key="item.label">
    <app-menu-item :item="item" :index="i" />
  </ul>
</template>

<style lang="scss" scoped></style>
