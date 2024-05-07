<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { authApi } from '@/api/requests'
import { useAuthStore } from '@/stores/auth'

import type { AuthorizationRequest } from '@/api/types'
import { type ValidationError, isApiError } from '@/utils/isApiError'

import FormItem from '@/components/FormItem/FormItem.vue'
import RenderErrors from '@/components/RenderErrors/RenderErrors.vue'

const toast = useToast()
const router = useRouter()

const userData = reactive<AuthorizationRequest>({
  tel: '',
  password: ''
})

const { isLoading, fetchData, data } = authApi.authorize()

const cleanErrors = {
  tel: [],
  password: []
}

const errors = reactive<{ data: ValidationError }>({
  data: cleanErrors
})
const error = ref('')

const { login } = useAuthStore()

watch(
  data,
  () => {
    if (!data.value) return
    login(data.value.token)
  },
  { immediate: true }
)

const handleLogin = async () => {
  errors.data = cleanErrors
  error.value = ''

  toast.add({
    closable: false,
    severity: 'info',
    summary: 'Выполняется вход',
    detail: 'Пожалуйста, подождите',
    life: 1000
  })

  try {
    await fetchData(userData)
    await router.replace('/')
  } catch (e) {
    toast.add({
      closable: true,
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: 'Попробуйте еще раз',
      life: 1500
    })

    if (!(isApiError(e) && e.response)) {
      return
    }

    if (e.response.status === 422) {
      errors.data = e.response.data.errors
      return
    }

    error.value = e.response.data.message
  }
}

const isAllDataPassed = computed(
  () =>
    !isLoading.value &&
    userData.tel.trim() !== '' &&
    userData.password.trim() !== ''
)
</script>

<template>
  <Toast />
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-3">
            <div class="text-900 text-3xl font-medium mb-3">Вход</div>
          </div>

          <div class="flex justify-content-center mb-3">
            <InlineMessage v-if="error.length" severity="error">{{ error }}</InlineMessage>
          </div>

          <div class="w-full">
            <div class="w-full mb-3">
              <FormItem
                :invalid="Boolean(errors.data.tel?.length)"
                placeholder="Введите номер телефона"
                full
                id="phone"
                v-model="userData.tel"
                label="Телефон"
              />
              <RenderErrors v-if="errors.data.tel?.length" :values="errors.data.tel" />
            </div>

            <div class="w-full md:w-30rem mb-3">
              <label for="password" class="block text-900 font-medium text-xl mb-2">Пароль</label>
              <Password
                id="password"
                v-model="userData.password"
                placeholder="Введите пароль"
                :toggleMask="true"
                class="w-full"
                input-class="w-full p-3"
                :invalid="Boolean(errors.data.password?.length)"
              />
              <RenderErrors v-if="errors.data.password?.length" :values="errors.data.password" />
            </div>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <RouterLink to="/register" class="font-medium no-underline ml-2 text-right cursor-pointer">
                Еще нет аккаунта?
              </RouterLink>
            </div>

            <Button :disabled="!isAllDataPassed" label="Войти" class="w-full p-3 text-xl" @click="handleLogin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
