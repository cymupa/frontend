<script setup lang="ts">
import { ref } from 'vue'

import { invitesToTeam } from '@/data'

const isVisible = ref()
const members = ref(invitesToTeam)

const toggle = (event: MouseEvent) => {
  isVisible.value.toggle(event)
}
</script>

<template>
  <div>
    <button class="p-link layout-menu-button layout-topbar-button" @click="toggle">
      <i v-if="members.length" v-badge="members.length + 5" class="pi pi-shopping-cart"></i>
      <i v-else class="pi pi-shopping-cart"></i>
      <span>Корзина</span>
    </button>
  </div>
</template>
