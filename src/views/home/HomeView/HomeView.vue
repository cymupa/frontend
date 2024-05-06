<script setup lang="ts">
import { ref } from 'vue'

import { newsListData } from '@/data'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import NewsItem from './NewsItem/NewsItem.vue'

const newsList = ref(newsListData)
</script>

<template>
    <ScrollWrapper>
      <MainTitle bold>Новости</MainTitle>

      <div class="flex justify-content-center" v-if="!newsListData.length">
        <Message :closable="false">Новостей нет</Message>
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
