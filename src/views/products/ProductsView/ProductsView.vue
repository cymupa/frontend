<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { productsApi } from '@/api/requests/products'
import type { GetProductsResponse } from '@/api/types'

import { isApiError } from '@/utils/isApiError'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'

const newsList = ref<GetProductsResponse[]>([])

const { data, fetchData, isLoading, error } = productsApi.getAllProducts()

const getNews = async () => {
  try {
    await fetchData({})

    if (!data.value) {
      return
    }

    newsList.value = data.value
  } catch (e) {
    if (!isApiError(e)) {
      return
    }

    console.warn(e)
  }
}

onMounted(async () => await getNews())
</script>

<template>
  <ScrollWrapper>
    <MainTitle bold>Продукты</MainTitle>

    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isLoading" />
      <Message severity="error" :closable="false" v-else-if="error">Ошибка</Message>
      <Message v-else-if="!newsList.length" :closable="false">Новостей нет</Message>
    </div>

    <div class="news-container">

    </div>
  </ScrollWrapper>
</template>

<style scoped>

</style>
