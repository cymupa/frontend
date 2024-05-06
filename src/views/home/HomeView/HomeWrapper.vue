<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { onMounted, watch } from 'vue'

import Toast from 'primevue/toast'

import { userApi } from '@/api/requests'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { isApiError } from '@/utils/isApiError'
import { logOut } from '@/utils/logOut'

const { setUserInfo } = useUserStore()

const { token } = storeToRefs(useAuthStore())
const { state } = storeToRefs(useUserStore())

const toast = useToast()

const { data, fetchData, isLoading } = userApi.getUserInfo()

const getUserInfo = async () => {
  try {
    await fetchData()

    if (!data.value) {
      return
    }

    const userData = data.value[0]

    console.log('user', userData)

    setUserInfo(userData)
    toast.removeAllGroups()
    toast.add({
      closable: true,
      life: 1500,
      severity: 'success',
      summary: 'Добро пожаловать!',
      detail: 'Данные загружены',
      styleClass: { 'z-index': 99999999999 }
    })
  } catch (e) {
    if (!isApiError(e)) {
      return
    }

    if (e.response?.status === 401) {
      await logOut()
    }

    console.warn(e)
  }
}

onMounted(async () => {
  if (token && !state.value.data.id && isLoading) {
    toast.removeAllGroups()
    toast.add({
      closable: false,
      severity: 'info',
      summary: 'Пожалуйста, подождите',
      detail: 'Загружаю информацию о тебе...',
      styleClass: { 'z-index': 99999999999 }
    })
  }

  await getUserInfo()
})

watch(
  state,
  () => {
    console.log('state', state.value)
  },
  { immediate: true }
)
</script>

<template>
  <Toast />
<slot />
</template>

<style scoped>

</style>