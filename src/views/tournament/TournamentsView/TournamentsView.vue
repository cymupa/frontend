<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { reactive, ref } from 'vue'

import { tournamentsData } from '@/data'

import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import TournamentItem from './TournamentItem.vue'

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
    <SplitButton :label="filter" :model="items" />
    <Toast />

    <DataView data-key="id" :value="tournaments">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in tournaments" :key="item.id" class="col-12">
            <TournamentItem :index="index" :tournament="item" />
          </div>
        </div>
      </template>
    </DataView>
  </ScrollWrapper>
</template>
