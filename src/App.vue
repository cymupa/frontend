<script setup lang="ts">
import { themeProvider } from './providers/themeProvider'

themeProvider()
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped></style>
