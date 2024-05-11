<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, watch } from 'vue'

import type { GetCategoriesResponse } from '@/api/types'
import { useFetch } from '@/hooks'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import TournamentItem from './TournamentItem/TournamentItem.vue'

const toast = useToast()
const tournaments = ref<any[]>([])
const filter = ref<string>('Все')
const categories = ref<GetCategoriesResponse[]>([])

const { fetchData, isLoading, data, error } = useFetch('tournaments', 'GET')
const {
  fetchData: fetchGames,
  isLoading: isGamesLoading,
  data: gamesData,
  error: gamesError
} = useFetch('games', 'GET')

const filteredTournaments = computed(() => {
  if (filter.value === 'Все') {
    return tournaments.value
  }

  return tournaments.value.filter((tournament) => {
    const category = categories.value.find((cat) => cat.name === filter.value)
    return category ? tournament.game_id === category.id : false
  })
})

const getTournaments = async () => {
  await Promise.all([fetchGames(), fetchData()])

  if (!data.value) {
    return
  }

  tournaments.value = data.value

  if (!gamesData.value) {
    return
  }

  categories.value = gamesData.value
}

interface Item {
  label: string
  command: () => void
}

const items = ref<Item[]>([])

watch(categories, async () => {
  if (categories.value.length > 0) {
    items.value = [
      {
        label: 'Все',
        command: () => {
          filter.value = 'Все'
          toast.add({
            severity: 'success',
            summary: 'Все',
            life: 3000
          })
        }
      },
      ...categories.value.map((category) => ({
        label: category.name,
        command: () => {
          filter.value = category.name
          toast.add({
            severity: 'success',
            summary: category.name,
            life: 3000
          })
        }
      }))
    ]
  }
})

onMounted(getTournaments)
</script>

<template>
  <ScrollWrapper>
    <MainTitle bold>Турниры</MainTitle>

    <Message v-if="isGamesLoading" :closable="false">Загружаю...</Message>
    <Message v-else-if="gamesError" severity="error" :closable="false">Ошибка</Message>
    <Message v-else-if="!categories.length" :closable="false">Игры не найдены</Message>
    <SplitButton v-else :label="filter" :model="items" />
    <Toast />

    <Message v-if="error" severity="error" :closable="false">Ошибка при получении данных</Message>
    <div v-else-if="isLoading" class="flex justify-content-center">
      <ProgressSpinner />
    </div>

    <div v-else-if="!filteredTournaments.length" class="flex justify-content-center">
      <Message :closable="false">Турниров нет</Message>
    </div>
    <DataView v-else data-key="id" :value="filteredTournaments">
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
