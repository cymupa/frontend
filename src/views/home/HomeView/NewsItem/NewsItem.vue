<script setup lang="ts">
import { useRouter } from 'vue-router'

import type { GetNewsResponse } from '@/api/types'

const router = useRouter()

interface Props {
  index: number
  news: GetNewsResponse
}

const { news } = defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden" :key="index">
    <template #header>
      <img v-if="news.photos[0]" alt="user header" height="300" class="w-full object-cover" :src="news.photos[0]" />
    </template>

    <template #title>
      {{ news.name }}
    </template>

    <template #content>
      <p class="overflow-hidden text">
        {{ news.description }}
      </p>

      <Button icon="pi pi-arrow-circle-right" icon-pos="right" @click="router.push(`news/${news.id}`)" label="Подробнее" />
    </template>
  </Card>
</template>

<style scoped>
.text {
  word-break: break-word;
  max-height: 4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 2rem;
}
</style>
