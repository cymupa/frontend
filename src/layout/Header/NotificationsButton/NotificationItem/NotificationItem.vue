<script setup lang="ts">
interface Props {
  index: number
  member: {
    name: string
    team_name: string
  }
}
const { member } = defineProps<Props>()
</script>

<template>
  <li>
    <Divider v-if="index !== 0" />

    <div class="flex align-items-center">
      <div class="flex flex-column line-height gap-2">
        <span
          >От <Tag severity="info">{{ member.name }}</Tag></span
        >
        <span
          >В <Tag>{{ member.team_name }}</Tag></span
        >
      </div>

      <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
        <Button icon="pi pi-check" aria-label="Filter" />
        <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
      </div>
    </div>
  </li>
</template>
