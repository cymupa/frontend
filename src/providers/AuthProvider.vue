<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref } from 'vue'

import Toast from 'primevue/toast'

import { userApi } from '@/api/requests'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { isApiError } from '@/utils/isApiError'
import { logOut } from '@/utils/logOut'

const { setUserInfo } = useUserStore()

const { token } = storeToRefs(useAuthStore())
const { state, isError } = storeToRefs(useUserStore())

const toast = useToast()
const { getActualCart } = useCartStore()

const { data, fetchData, isLoading } = userApi.getUserInfo()

const getUserInfo = async () => {
  isError.value = false

  try {
    await fetchData()

    if (!data.value) {
      return
    }

    const userData = data.value

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
    getActualCart()
  } catch (e) {
    toast.removeAllGroups()
    isError.value = true

    visible.value = true

    if (!isApiError(e)) {
      return
    }

    if (e.response?.status === 401) {
      // await logOut()
      return
    }

    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Попробуйте позже',
      group: 'bc',
      closable: false
    })

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

const visible = ref(false)

const onReply = async () => {
  toast.removeGroup('bc')
  visible.value = false
  await getUserInfo()
}
</script>

<template>
  <Toast position="top-center" group="bc">
    <template>
      <div class="flex flex-column align-items-start" style="flex: 1">
        <div>Произошла ошибка</div>
        <Button class="mt-3" severity="danger" label="Попробовать снова" @click="onReply()" />
      </div>
    </template>
  </Toast>
  <slot />
</template>

<style scoped></style>
