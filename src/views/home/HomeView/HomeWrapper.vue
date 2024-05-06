<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'

import Toast from 'primevue/toast'

import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const { token } = storeToRefs(useAuthStore())
const { fullName } = storeToRefs(useUserStore())

const toast = useToast()

const getUserInfo = async () => {
  try {
  } catch (e) {
    console.log(e)
  } finally {
  }
}

onMounted(() => {
  if (token && !fullName) {
    toast.removeAllGroups()
    toast.add({
      closable: false,
      severity: 'info',
      summary: 'Добро пожаловать!',
      detail: 'Загружаю информацию о тебе...',
      styleClass: { 'z-index': 99999999999 }
    })
  }
})
</script>

<template>
  <Toast />
<slot />
</template>

<style scoped>

</style>