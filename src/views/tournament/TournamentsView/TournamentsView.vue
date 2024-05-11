<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { reactive, ref } from 'vue'

import { tournamentsData } from '@/data'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import TournamentItem from './TournamentItem/TournamentItem.vue'

const toast = useToast()
const tournaments = reactive(tournamentsData)

const filter = ref<string>('All')

const items = [
  {
    label: 'All',
    command: () => {
      filter.value = 'All'
      toast.add({
        severity: 'success',
        summary: 'All',
        life: 3000
      })
    }
  },
  {
    label: 'CS2',
    command: () => {
      filter.value = 'CS2'
      toast.add({
        severity: 'success',
        summary: 'CS2',
        life: 3000
      })
    }
  },
  {
    label: 'Dota 2',
    command: () => {
      filter.value = 'Dota 2'
      toast.add({
        severity: 'success',
        summary: 'Dota 2',
        life: 3000
      })
    }
  },
  {
    label: 'Mobile Legends',
    command: () => {
      filter.value = 'Moba'
      toast.add({
        severity: 'success',
        summary: 'MOBA',
        life: 3000
      })
    }
  },
  {
    label: 'League Of Legends',
    command: () => {
      filter.value = 'LOL'
      toast.add({
        severity: 'success',
        summary: 'Lol',
        life: 3000
      })
    }
  }
]
</script>

<template>
  <ScrollWrapper>
    <MainTitle bold>Турниры</MainTitle>

    <SplitButton :label="filter" :model="items" />
    <Toast />

    <div class="flex justify-content-center" v-if="!tournaments.length">
      <Message :closable="false">Турниров нет</Message>
    </div>
    <DataView v-else data-key="id" :value="tournaments">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="item.id" class="col-12">
            <TournamentItem :index="index" :tournament="item" />
          </div>
        </div>
      </template>
    </DataView>
  </ScrollWrapper>
</template>
