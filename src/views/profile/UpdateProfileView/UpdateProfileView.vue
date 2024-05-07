<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useUserStore } from '@/stores/user'
import {formatDate} from "@/utils/formatDate";

const { setUserInfo } = useUserStore()
const { state } = storeToRefs(useUserStore())

// const getUserInfo = async () => {
//   try {
//     await fetchData()
//
//     if (!data.value) {
//       return
//     }
//
//     const userData = data.value[0]
//
//     console.log('user', userData)
//
//     setUserInfo(userData)
//   } catch (e) {
//     if (!isApiError(e)) {
//       return
//     }
//
//     if (e.response?.status === 401) {
//       await logOut()
//     }
//
//     console.warn(e)
//   }
// }

const handleUpdateUserData = async () => {
  console.log('state.data', state.value.data)
  console.log('state.data2', state.value.data.birth)
  console.log('state.data3', formatDate(state.value.data.birth))
}

onMounted(async () => {
  if (!state.value.data.id) {
    console.log(1)
    // await getUserInfo()
  }
})
</script>

<template>
  <div class="col-12">
    <div class="card">
      <h5>Информация о вас</h5>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-4">
          <label for="firstname">Имя</label>
<!--          v-model="state.data.name"-->
          <InputText id="firstname" type="text" v-model="state.data.name" />
        </div>

        <div class="field col-12 md:col-4">
          <label for="lastname">Фамилия</label>
          <InputText id="lastname" type="text" v-model="state.data.surname" />
        </div>

        <div class="field col-12 md:col-4">
          <label for="patronymic">Отчество</label>
          <InputText id="patronymic" type="text" v-model="state.data.patronymic" />
        </div>

        <div class="field col-12">
          <label for="about">О вас</label>
          <Textarea auto-resize id="about" rows="4" v-model="state.data.description" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="phone">Телефон</label>
          <InputText id="phone" type="text" v-model="state.data.tel" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="address">Адрес</label>
          <InputText id="address" type="text" v-model="state.data.address" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="birth">Дата рожедния</label>
          <Calendar placeholder="Дата рождения" :max-date="new Date()" v-model="state.data.birth" showIcon :showOnFocus="false" inputId="birth" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="nickname">Ник</label>
          <InputText id="nickname" type="text" v-model="state.data.nickname" />
        </div>
      </div>

      <Button @click="handleUpdateUserData">Сохранить</Button>
    </div>
  </div>
</template>
