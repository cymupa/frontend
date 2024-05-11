<script setup lang="ts">
import { useRouter } from 'vue-router'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import SmallText from '@/components/SmallText/SmallText.vue'

import type { Game } from '@/types/Game'

interface Props {
  index: number
  team: {
    id: number
    name: string
    players_count: number
    reward: number
    game: string
    date: string
  }
}
const { team } = defineProps<Props>()

const router = useRouter()
//
// const getTagStyle = (game: keyof typeof Game) => {
//   switch (game) {
//     case 'Dota 2':
//       return 'info'
//     case 'CS2':
//       return 'success'
//     case 'Mobile':
//       return 'secondary'
//     case 'LoL':
//       return 'warning'
//     default:
//       return 'contrast'
//   }
// }
</script>

<template>
  <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-2" :class="{ 'border-top-1 surface-border': index !== 0 }">
    <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 md:gap-2 gap-4">
      <div class="md:w-5 flex md:flex-column justify-content-between gap-2">
        <div>
          <MainTitle class="mb-1">{{ team.name }}</MainTitle>
<!--          <SmallText class="mb-1">{{ team.date }}</SmallText>-->
<!--          <Tag :value="team.game" :severity="getTagStyle(team.game)" />-->
        </div>
      </div>

      <div class="flex flex-column md:align-items-end gap-5">
        <div class="flex flex-column gap-2">
          <SmallText class="mb-1">Кол-во игроков:</SmallText>
          <span class="text-xl font-semibold text-900">{{ team.team_list.length + 1 }}</span>
        </div>
      </div>

<!--      <div class="flex flex-column md:align-items-end gap-5">-->
<!--        <div class="flex flex-column gap-2">-->
<!--          <SmallText class="mb-1">Суммарный выигрышь:</SmallText>-->
<!--          <span class="text-xl font-semibold text-900">${{ team.reward }}</span>-->
<!--        </div>-->
<!--      </div>-->

      <Button size="small" icon="pi pi-arrow-right" @click="router.push(`team/${team.id}`)" label="Перейти" />
    </div>
  </div>
</template>
