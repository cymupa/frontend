<script setup lang="ts">
import { ref } from 'vue'

import { newsListData } from '@/data'

const newsList = ref(newsListData)
</script>

<template>
  <ScrollPanel
    class="scroll-wrapper"
    :pt="{
      wrapper: {
        style: { 'border-right': '10px solid var(--surface-ground)' },
      },
      bary: 'hover:bg-primary-400 bg-primary-300 opacity-100',
    }"
  >
    <div class="news-container">
      <Card style="overflow: hidden" v-for="(news, index) in newsList" :key="index">
        <template #header>
          <img
            alt="user header"
            height="400"
            class="w-full"
            style="object-fit: cover"
            src="https://randomwordgenerator.com/img/picture-generator/5ee4d14b4d51b10ff3d8992cc12c30771037dbf8525478487c2f7dd69244_640.jpg"
          />
        </template>

        <template #title>
          <RouterLink :to="`news/${news.id}`">
            <span class="p-ml-2 title w-full block">{{ news.title }}</span>
          </RouterLink>
        </template>

        <template #content>
          <p class="overflow-hidden text">
            {{ news.description }}
          </p>
        </template>
      </Card>
    </div>
  </ScrollPanel>
</template>

<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 80vh;
}

.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 1rem;

  padding-bottom: 10px;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text {
  word-break: break-word;
  max-height: 4rem;
  text-overflow: ellipsis;
  line-height: 2rem;
}

@media (max-width: 567px) {
  .news-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
