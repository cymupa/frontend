<script setup lang="ts">
interface Props {
  is?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  bold?: boolean
}
const { is } = withDefaults(defineProps<Props>(), {
  is: 'h3',
})
</script>

<template>
  <component :is="is" class="font-medium text-900" :class="{ 'font-bold': bold, 'text-lg': !bold }"><slot /></component>
</template>
