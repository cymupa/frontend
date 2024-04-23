<script setup lang="ts">
import { onBeforeMount } from 'vue/dist/vue'

onBeforeMount(() => {
  const theme = localStorage.getItem('theme')
  if (!theme) {
    return
  }

  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme
    console.log(theme)
    layoutConfig.darkTheme.value = theme.includes('dark')
  })
})
</script>

<template>
  <slot />
</template>

<style scoped></style>
