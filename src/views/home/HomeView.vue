<script setup lang="ts">
import { ref } from 'vue'

import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import { newsListData } from '@/data'
import router from '@/router'

const newsList = ref(newsListData)
// Его можно динамически подргужать по сути и сделать top await
// @see https://ru.vuejs.org/guide/built-ins/suspense.html#async-setup
// @see https://ru.vuejs.org/guide/components/async#basic-usage
</script>

<template>
  <ScrollWrapper>
    <div class="news-container">
      <Card style="overflow: hidden" v-for="(news, index) in newsList" :key="index">
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
          <span class="overflow-hidden title">{{ news.title }}</span>
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

.title {
  display: block;
  word-break: break-word;
  max-height: 4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 2rem;
}

.text {
  word-break: break-word;
  max-height: 4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 2rem;
}

@media (max-width: 567px) {
  .news-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
