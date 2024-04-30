<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { reactive, ref } from 'vue'

import { teamsData } from '@/data'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import TeamItem from '@/views/team/TeamsView/TeamItem/TeamItem.vue'

const toast = useToast()
const teams = reactive(teamsData)

console.log('teams', teams)
</script>

<template>
  <ScrollWrapper>
    <MainTitle bold>Команды</MainTitle>

    <Toast />

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
