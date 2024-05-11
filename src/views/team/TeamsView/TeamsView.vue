<script setup lang="ts">
import { onMounted, ref } from 'vue'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import { useFetch } from '@/hooks'
import TeamItem from '@/views/team/TeamsView/TeamItem/TeamItem.vue'

const { data, fetchData, isLoading } = useFetch('teams', 'GET')

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

    <DataView data-key="id" :value="teams">
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
