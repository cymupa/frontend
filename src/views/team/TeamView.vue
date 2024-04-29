<script setup lang="ts">
const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
})

console.log('id', id)
</script>

<template>single team</template>
