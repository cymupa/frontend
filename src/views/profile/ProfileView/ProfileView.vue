<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

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
          <label for="firstname2">Имя</label>
          <InputText id="firstname2" type="text" :value="state.data.name" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="lastname2">Фамилия</label>
          <InputText id="lastname2" type="text" :value="state.data.surname"  />
        </div>
        <div class="field col-12 md:col-4">
          <label for="patronymic">Отчество</label>
          <InputText id="patronymic" type="text" :value="state.data.patronymic"  />
        </div>
        <div class="field col-12">
          <label for="address">О вас</label>
          <Textarea id="address" rows="4" :value="state.data.description"  />
        </div>
        <div class="field col-12 md:col-6">
          <label for="city">Телефон</label>
          <InputText id="city" type="text" :value="state.data.tel"  />
        </div>

        <div class="field col-12 md:col-6">
          <label for="city">Адрес</label>
          <InputText id="city" type="text" :value="state.data.address"  />
        </div>

        <div class="field col-12 md:col-6">
          <label for="zip">Дата рожедния</label>
          <Calendar
              placeholder="Дата рождения"
              :max-date="new Date()"
              showIcon
              :showOnFocus="false"
              inputId="birth"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label for="zip">Ник</label>
          <InputText id="zip" type="text" :value="state.data.nickname" />
        </div>
      </div>

      <Button>Сохранить</Button>
    </div>
  </div>
</template>
