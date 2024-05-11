<script setup lang="ts">
import { useRouter } from 'vue-router'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import SmallText from '@/components/SmallText/SmallText.vue'
import type { Game } from '@/types/Game'

interface Props {
  index: number
  tournament: {
    dates: string
    name: string
    game: string
    teamsCount: number
    totalPrize: number
    id: number
  }
}
const { tournament } = defineProps<Props>()

const router = useRouter()

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
  <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-2" :class="{ 'border-top-1 surface-border': index !== 0 }">
    <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 md:gap-2 gap-4">
      <div class="md:w-5 flex md:flex-column justify-content-between gap-2">
        <div>
          <SmallText class="mb-1">{{ tournament.start }} - {{ tournament.end }}</SmallText>
          <MainTitle class="mb-1">{{ tournament.name }}</MainTitle>
          <Tag :value="tournament.game" :severity="getTagStyle(tournament.game)" />
        </div>
      </div>

      <div class="flex flex-column md:align-items-end gap-5">
        <div class="flex flex-column gap-2">
          <SmallText class="mb-1">Взнос:</SmallText>
          <span class="text-xl font-semibold text-900">${{ tournament.payment }} Р.</span>
        </div>
      </div>

      <Button size="small" icon="pi pi-arrow-right" @click="router.push(`tournament/${tournament.id}`)" label="Перейти" />
    </div>
  </div>
</template>
