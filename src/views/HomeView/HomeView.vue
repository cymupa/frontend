<script setup lang="ts">
import { ref, watch } from 'vue'

import { useLayout } from '@/layout/composables/layout'
import { darkTheme, lightTheme } from '@/config/themes'
import type { Options } from './types'

const { isDarkTheme } = useLayout()

const lineOptions = ref<Options | null>(null)

const applyLightTheme = () => {
  lineOptions.value = lightTheme
}

const applyDarkTheme = () => {
  lineOptions.value = darkTheme
}

watch(
  isDarkTheme,
  (val) => {
    if (val) {
      applyDarkTheme()
    } else {
      applyLightTheme()
    }
  },
  { immediate: true },
)
</script>

<template>news all</template>
