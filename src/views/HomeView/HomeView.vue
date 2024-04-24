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
      <Card v-for="(news, index) in newsList" :key="index">
        <template #title>
          <div class="flex gap-3 align-items-center">
            <Avatar
              image="https://randomwordgenerator.com/img/picture-generator/5ee4d14b4d51b10ff3d8992cc12c30771037dbf8525478487c2f7dd69244_640.jpg"
              shape="circle"
              size="large"
            />
            <span class="p-ml-2 title w-10">{{ news.title }}</span>
          </div>
        </template>

        <template #content>
          <p class="m-0 overflow-hidden text-overflow-ellipsis">
            {{ news.description }}
          </p>
        </template>
      </Card>
    </div>
  </ScrollPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newsList = ref([
  {
    avatar: 'url_to_avatar_1',
    title: 'Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1',
    description:
      'Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1Новостщпщвпазщвапвапвзщплзщплвазщплвазщплваплщвпалвапзщлвпалзщвпалвзщпалпвпвзь 1',
  },
  {
    avatar: 'url_to_avatar_2',
    title: 'Новость 2',
    description: 'Краткое описание новости 2',
  },
])
</script>

<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow-x: auto;
}

.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
