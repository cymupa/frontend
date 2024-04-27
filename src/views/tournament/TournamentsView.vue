<script setup lang="ts">
import { reactive } from 'vue'

import { tournamentsData } from '@/data'
import type { Game } from '@/types/Game'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import SmallText from '@/components/SmallText/SmallText.vue'
import router from '@/router'

const tournaments = reactive(tournamentsData)

const getTagStyle = (game: keyof typeof Game) => {
  switch (game) {
    case 'Dota 2':
      return 'info'
    case 'CS2':
      return 'success'
    case 'Mobile':
      return 'secondary'
    case 'LoL':
      return 'warning'
    default:
      return 'contrast'
  }
}
</script>

<template>
  <ScrollWrapper>
    <DataView data-key="id" :value="tournaments">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in tournaments" :key="item.id" class="col-12">
            <div
              class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-2"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 md:gap-2 gap-4">
                <div class="md:w-5 flex md:flex-column justify-content-between gap-2">
                  <div>
                    <SmallText>{{ item.dates }}</SmallText>
                    <MainTitle>{{ item.title }}</MainTitle>
<!--                    'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'contrast'-->
                    <Tag :value="item.game" :severity="getTagStyle(item.game)" />
                  </div>
                </div>

                <div class="flex flex-column md:align-items-end gap-5">
                  <div class="flex flex-column gap-2">
                    <SmallText>Кол-во команд:</SmallText>
                    <span class="text-xl font-semibold text-900">{{ item.teamsCount }}</span>
                  </div>
                </div>

                <div class="flex flex-column md:align-items-end gap-5">
                  <div class="flex flex-column gap-2">
                    <SmallText>Призовой фонд:</SmallText>
                    <span class="text-xl font-semibold text-900">${{ item.totalPrize }}</span>
                  </div>
                </div>

                <Button size="small" icon="pi pi-arrow-right" @click="router.push(`tournament/${item.id}`)" label="Перейти" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </ScrollWrapper>
</template>

<style scoped></style>
