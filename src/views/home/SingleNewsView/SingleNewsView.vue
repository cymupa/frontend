<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { newsApi } from '@/api/requests'
import type { GetNewsResponse } from '@/api/types'

import { isApiError } from '@/utils/isApiError'

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
})

const news = ref<GetNewsResponse | null>(null)
const activeIndex = ref(0)
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
])

const next = () => {
  if (!news.value?.photos?.length) {
    return
  }

  activeIndex.value =
    activeIndex.value === news.value.photos.length - 1
      ? news.value?.photos.length - 1
      : activeIndex.value + 1
}

const prev = () => {
  activeIndex.value = activeIndex.value === 0 ? 0 : activeIndex.value - 1
}

const { data, fetchData, isLoading } = newsApi.getNewsById({
  id
})

const getSingleNews = async () => {
  try {
    await fetchData({
      id
    })

    if (!data.value) {
      return
    }

    news.value = data.value
  } catch (e) {
    if (!isApiError(e)) {
      return
    }

    console.warn(e)
  }
}

onMounted(async () => await getSingleNews())
</script>

<template>
  <Card>
    <template #title>{{ news?.name }}</template>

    <template #content>
      <div class="flex justify-content-center">
        <ProgressSpinner v-if="isLoading" />
        <Message v-else-if="!news?.content" :closable="false">Новость не найдена</Message>
      </div>

      <template v-if="news?.photos">
        <div v-if="news?.photos.length > 1" class="mb-3">
          <Button icon="pi pi-minus" @click="prev" />
          <Button icon="pi pi-plus" @click="next" severity="secondary" class="ml-2" />
        </div>

        <Galleria
          v-model:activeIndex="activeIndex"
          :value="news?.photos"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          containerStyle="max-width: 340px"
          :showThumbnails="false"
          :showIndicators="true"
        >
          <template #item v-for="image in news?.photos">
            <img :src="image" alt="image" style="width: 100%" />
          </template>
        </Galleria>
      </template>

      <p class="m-0">
        {{ news?.content }}
      </p>
    </template>
  </Card>
</template>
