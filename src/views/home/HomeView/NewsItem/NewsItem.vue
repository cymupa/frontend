<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  index: number
  news: {
    id: number
    title: string
    description: string
  }
}

const { member } = defineProps<Props>()
</script>

<template>
  <Card style="overflow: hidden" :key="index">
    <template #header>
      <img
          alt="user header"
          height="300"
          class="w-full"
          style="object-fit: cover"
          src="https://randomwordgenerator.com/img/picture-generator/5ee4d14b4d51b10ff3d8992cc12c30771037dbf8525478487c2f7dd69244_640.jpg"
      />
    </template>

    <template #title>
      {{ news.title }}
    </template>

    <template #content>
      <p class="overflow-hidden text">
        {{ news.description }}
      </p>

      <Button
          icon="pi pi-arrow-circle-right"
          icon-pos="right"
          @click="router.push(`news/${news.id}`)"
          label="Подробнее"
      />
    </template>
  </Card>
</template>