<script setup lang="ts">
import { ref } from 'vue'

import { invitesToTeam } from '@/data'

const members = ref(invitesToTeam)

// TODO:
// 1. use store
</script>

<template>
  <div v-if="!members.length">
    <RouterLink class="p-link layout-menu-button layout-topbar-button" to="/cart">
      <i v-if="members.length" v-badge="members.length" class="pi pi-shopping-cart"></i>
      <i v-else class="pi pi-shopping-cart"></i>
      <span>Корзина</span>
    </RouterLink>
  </div>
</template>
