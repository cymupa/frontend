<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useUserStore } from '@/stores/user'

import { userApi } from '@/api/requests'

// import { isApiError } from '@/utils/isApiError'
// import { logOut } from '@/utils/logOut'

const { data, fetchData, isLoading } = userApi.getUserInfo()

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
          <InputText id="firstname" type="text" :value="state.data.name" />
        </div>

        <div class="field col-12 md:col-4">
          <label for="lastname">Фамилия</label>
          <InputText id="lastname" type="text" :value="state.data.surname" />
        </div>

        <div class="field col-12 md:col-4">
          <label for="patronymic">Отчество</label>
          <InputText id="patronymic" type="text" :value="state.data.patronymic" />
        </div>

        <div class="field col-12">
          <label for="about">О вас</label>
          <Textarea auto-resize id="about" rows="4" :value="state.data.description" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="phone">Телефон</label>
          <InputText id="phone" type="text" :value="state.data.tel" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="address">Адрес</label>
          <InputText id="address" type="text" :value="state.data.address" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="birth">Дата рожедния</label>
          <Calendar placeholder="Дата рождения" :max-date="new Date()" showIcon :showOnFocus="false" inputId="birth" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="nickname">Ник</label>
          <InputText id="nickname" type="text" :value="state.data.nickname" />
        </div>
      </div>

      <Button>Сохранить</Button>
    </div>
  </div>
</template>
