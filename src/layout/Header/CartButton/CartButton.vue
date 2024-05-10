<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCartStore } from '@/stores/cart'

const { state } = storeToRefs(useCartStore())
</script>

<template>
  <div v-if="state.data.length">
    <RouterLink class="p-link layout-menu-button layout-topbar-button" to="/cart">
      <i v-badge="state.data.length" class="pi pi-shopping-cart"></i>
      <span>Корзина</span>
    </RouterLink>
  </div>
</template>
