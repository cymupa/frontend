<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { newsApi } from '@/api/requests'
import type { GetNewsResponse } from '@/api/types'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import NewsItem from './NewsItem/NewsItem.vue'

const newsList = ref<GetNewsResponse[]>([])

const { data, fetchData, isLoading, error } = newsApi.getAllNews()

const getNews = async () => {
  await fetchData()

  if (!data.value) {
    return
  }

  newsList.value = data.value
}

onMounted(async () => await getNews())
</script>

<template>
  <ScrollWrapper>
    <MainTitle bold>Новости</MainTitle>

    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isLoading" />
      <Message severity="error" :closable="false" v-else-if="error">Ошибка</Message>
      <Message v-else-if="!newsList.length" :closable="false">Новостей нет</Message>
    </div>

    <div class="news-container">
      <NewsItem
        v-if="newsList.length"
        style="overflow: hidden"
        v-for="(news, index) in newsList"
        :news="news"
        :index="index"
        :key="index"
      />
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
