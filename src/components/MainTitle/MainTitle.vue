<script setup lang="ts">
interface Props {
  is?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}
const { is } = withDefaults(defineProps<Props>(), {
  is: 'h3',
})
</script>

<template>
  <component :is="is" :class="['title', is]" class="text-lg font-medium text-900"><slot /></component>
</template>

<style scoped></style>
