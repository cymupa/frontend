<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: 'Общее',
    items: [
      { label: 'Лента новостей', icon: 'pi pi-fw pi-home', to: '/' },
      { label: 'Список турниров', icon: 'pi pi-fw pi-home', to: '/tournaments' },
      { label: 'Список команд', icon: 'pi pi-fw pi-home', to: '/teams' },
    ],
  },
  {
    label: 'Личное',
    // TODO: add team id from store
    items: [{ label: 'Моя команда', icon: 'pi pi-fw pi-id-card', to: '/team' }],
  },
  {
    label: 'FOR TESTS',
    items: [
      { label: 'login', icon: 'pi pi-fw pi-id-card', to: '/login' },
      { label: 'register', icon: 'pi pi-fw pi-id-card', to: '/register' },
    ],
  },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
