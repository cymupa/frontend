<script setup lang="ts">
import { useFetch } from '@/hooks'
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/formatDate'

const { id } = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { data, fetchData, isLoading, error} = useFetch(`teams/${id}`, 'GET')

const team = ref()

const getTeams = async () => {
  await fetchData()

  if (!data.value) {
    return
  }

  team.value = data.value
}

onMounted(getTeams)

</script>

<template>
  <Toast />
  <ConfirmPopup />

  <div class="card" v-if="error">
    <Message severity="error" :closable="false">Ошибка при получении данных</Message>
  </div>
  <div v-else-if="isLoading || !team?.id" class="card flex justify-content-center">
    <ProgressSpinner />
  </div>
  <div v-else class="card">
    <div class="flex items-center mb-4">
      <div>
        <div class="text-sm text-gray-500">Команда <Tag>{{team.name}}</Tag></div>
      </div>
    </div>

    <div class="col-12 grid grid-cols-1 md:grid-cols-2">
      <div>
        <div class="flex items-center mb-2">
          <span class="mr-2 font-semibold">Кол-во игроков:</span>
          <span>{{ team.team_list.length + 1 }}</span>
        </div>

        <div class="flex items-center mb-2">
          <span class="mr-2 font-semibold">Капитан:</span>
          <span>{{ team.captain.name}}</span>
        </div>
<!--        <div class="flex items-center mb-2">-->
<!--          <span class="mr-2 font-semibold">Телефон:</span>-->
<!--          <span>{{ state.data.tel }}</span>-->
<!--        </div>-->

<!--        <div class="flex items-center align-items-center mb-2">-->
<!--          <span class="mr-2 font-semibold">О себе:</span>-->
<!--          <span v-if="state.data.description" class="break-words">{{ state.data.description }}</span>-->
<!--          <Tag v-else severity="info">Нет данных</Tag>-->
<!--        </div>-->

<!--        <div class="flex items-center align-items-center mb-2">-->
<!--          <span class="mr-2 font-semibold">Ник:</span>-->
<!--          <span v-if="state.data.nickname" class="break-words">{{ state.data.nickname }}</span>-->
<!--          <Tag v-else severity="info">Нет данных</Tag>-->
<!--        </div>-->

<!--        <div class="flex items-center align-items-center">-->
<!--          <span class="mr-2 font-semibold">Адрес:</span>-->
<!--          <span v-if="state.data.address" class="break-words">{{ state.data.address }}</span>-->
<!--          <Tag v-else severity="info">Нет данных</Tag>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
