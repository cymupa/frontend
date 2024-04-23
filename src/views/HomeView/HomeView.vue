<template>
  <div class="card flex justify-content-center">
    <Toast position="top-left" group="tl" />
    <Toast position="bottom-left" group="bl" />
    <Toast position="bottom-right" group="br" />

    <div class="flex flex-wrap gap-2">
      <Button label="Top Left" @click="showTopLeft" />
      <Button label="Bottom Left" severity="warning" @click="showBottomLeft" />
      <Button label="Bottom Right" severity="help" @click="showBottomRight" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const showTopLeft = () => {
  toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', group: 'tl', life: 3000 })
}

const showBottomLeft = () => {
  toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', group: 'bl', life: 3000 })
}

const showBottomRight = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', group: 'br', life: 3000 })
}
</script>
