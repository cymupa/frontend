<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePrimeVue } from 'primevue/config'

import { useLayout } from '@/layout/composables/layout'

const { layoutConfig } = useLayout()
const $primevue = usePrimeVue()

onBeforeMount(() => {
  const theme = localStorage.getItem('theme')
  if (!theme) {
    return
  }

  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme
    layoutConfig.darkTheme.value = theme.includes('dark')
  })
})
</script>

<template>
  <slot />
</template>
