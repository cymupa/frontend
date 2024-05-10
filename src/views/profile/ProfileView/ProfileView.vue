<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ConfirmPopup from 'primevue/confirmpopup'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/formatDate'

const { state, isError } = storeToRefs(useUserStore())
</script>

<template>
  <Toast />
  <ConfirmPopup />

  <div class="card" v-if="isError">
    <Message severity="error" :closable="false">Ошибка при получении данных</Message>
  </div>
  <div v-else-if="!state.data.id" class="card flex justify-content-center">
    <ProgressSpinner />
  </div>
  <div v-else class="card">
    <div class="flex items-center mb-4">
      <Avatar :icon="'pi pi-user'" class="mr-4" size="xlarge" />
      <div>
        <div class="text-xl font-semibold">{{ state.data.name }} {{ state.data.patronymic }} {{ state.data.surname }}</div>
        <div class="text-sm text-gray-500 mt-1">В команде <Tag>GeForce Exp</Tag></div>
      </div>
    </div>

    <div class="col-12 grid grid-cols-1 md:grid-cols-2">
      <div>
        <div class="flex items-center mb-2">
          <span class="mr-2 font-semibold">Дата рождения:</span>
          <span>{{ formatDate(state.data.birth) }}</span>
        </div>
        <div class="flex items-center mb-2">
          <span class="mr-2 font-semibold">Телефон:</span>
          <span>{{ state.data.tel }}</span>
        </div>

        <div class="flex items-center align-items-center mb-2">
          <span class="mr-2 font-semibold">О себе:</span>
          <span v-if="state.data.description" class="break-words">{{ state.data.description }}</span>
          <Tag v-else severity="info">Нет данных</Tag>
        </div>

        <div class="flex items-center align-items-center mb-2">
          <span class="mr-2 font-semibold">Ник:</span>
          <span v-if="state.data.nickname" class="break-words">{{ state.data.nickname }}</span>
          <Tag v-else severity="info">Нет данных</Tag>
        </div>

        <div class="flex items-center align-items-center">
          <span class="mr-2 font-semibold">Адрес:</span>
          <span v-if="state.data.address" class="break-words">{{ state.data.address }}</span>
          <Tag v-else severity="info">Нет данных</Tag>
        </div>
      </div>
    </div>
  </div>
</template>
