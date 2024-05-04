<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { authApi } from '@/api/requests'
import { useAuthStore } from '@/stores/auth'

import type { AuthorizationRequest } from '@/api/types'
import FormItem from '@/components/FormItem/FormItem.vue'
import RenderErrors from '@/components/RenderErrors/RenderErrors.vue'
import { type ValidationError, isApiError } from '@/utils/isApiError'

const toast = useToast()
const router = useRouter()

const userData = reactive<AuthorizationRequest>({
  tel: '',
  password: ''
})

const { isLoading, fetchData, data } = authApi.authorize(userData)

const errors = reactive<{ data: ValidationError }>({
  data: {
    tel: [],
    password: []
  }
})

const { login } = useAuthStore()

const handleLogin = async () => {
  try {
    toast.add({
      closable: false,
      severity: 'info',
      summary: 'Выполняется вход',
      detail: 'Пожалуйста, подождите',
      life: 1000
    })

    if (!data.value) {
      return
    }

    await fetchData()
    login(data.value.data.token)
    await router.replace('/')
  } catch (e) {
    if (isApiError(e) && e.response) {
      errors.data = e.response.data.errors
    }
  }
}
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
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Вход</div>
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

            <Button :disabled="isLoading" label="Войти" class="w-full p-3 text-xl" @click="handleLogin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
