<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { onMounted, ref, watch } from 'vue'

import Toast from 'primevue/toast'

import { userApi } from '@/api/requests'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { isApiError } from '@/utils/isApiError'
import { logOut } from '@/utils/logOut'

const { setUserInfo } = useUserStore()

const { token } = storeToRefs(useAuthStore())
const { state, isError } = storeToRefs(useUserStore())

const toast = useToast()

const { data, fetchData, isLoading } = userApi.getUserInfo()

const getUserInfo = async () => {
  isError.value = false

  try {
    await fetchData({})

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
    isError.value = true
    toast.add({ severity: 'error', group: 'bc', closable: false })
    visible.value = true

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

const visible = ref(false)

const onReply = () => {
  toast.removeGroup('bc')
  visible.value = false
}
</script>

<template>
  <Toast position="top-center" group="bc">
    <template #message="slotProps">
      <div class="flex flex-column align-items-start" style="flex: 1">
        <div>
          Произошла ошибка
        </div>
        <Button class="mt-3" severity="danger" label="Попробовать снова" @click="onReply()"/>
      </div>
    </template>
  </Toast>
  <slot />
</template>

<style scoped></style>
