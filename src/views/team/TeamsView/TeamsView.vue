<script setup lang="ts">
import { onMounted, ref } from 'vue'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import { useFetch } from '@/hooks'
import TeamItem from '@/views/team/TeamsView/TeamItem/TeamItem.vue'

const { data, fetchData, isLoading, error } = useFetch('teams', 'GET')

const teams = ref([])

const getTeams = async () => {
  await fetchData()

  if (!data.value) {
    return
  }

  teams.value = data.value
}

onMounted(getTeams)
</script>

<template>
  <ScrollWrapper>
    <MainTitle bold>Команды</MainTitle>


    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isLoading" />
      <Message severity="error" :closable="false" v-else-if="error">Ошибка</Message>
      <Message v-else-if="!teams.length" :closable="false">Продуктов нет</Message>
    </div>

    <DataView v-if="teams.length"  data-key="id" :value="teams">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="item.id" class="col-12">
            <TeamItem :index="index" :team="item" />
          </div>
        </div>
      </template>
    </DataView>
  </ScrollWrapper>
</template>
