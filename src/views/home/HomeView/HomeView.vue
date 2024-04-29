<script setup lang="ts">
import { ref } from 'vue'

import { newsListData } from '@/data'

import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import NewsItem from './NewsItem/NewsItem.vue'

const newsList = ref(newsListData)
// Его можно динамически подргужать по сути и сделать top await
// @see https://ru.vuejs.org/guide/built-ins/suspense.html#async-setup
// @see https://ru.vuejs.org/guide/components/async#basic-usage
</script>

<template>
  <ScrollWrapper>
    <h3 class="font-bold white-space-nowrap mb-3">Новости</h3>
    <div class="news-container">
      <NewsItem style="overflow: hidden" v-for="(news, index) in newsList" :news="news" :index="index" :key="index" />
    </div>
  </ScrollWrapper>
</template>

<style scoped>
.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 1rem;

  padding-bottom: 10px;
}

@media (max-width: 567px) {
  .news-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
