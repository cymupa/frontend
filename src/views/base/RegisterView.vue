<script lang="ts" setup>
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { authApi } from '@/api/requests'
import type { RegistrationRequest } from '@/api/types'
import { useAuthStore } from '@/stores/auth'

import { formatDate } from '@/utils/formatDate'
import { type ValidationError, isApiError } from '@/utils/isApiError'

import FormItem from '@/components/FormItem/FormItem.vue'
import RenderErrors from '@/components/RenderErrors/RenderErrors.vue'

const toast = useToast()

const userData = reactive<RegistrationRequest>({
  tel: '',
  birth: '',
  name: '',
  surname: '',
  password: '',
})

const cleanErrors = {
  tel: [],
  birth: [],
  name: [],
  surname: [],
  password: [],
}

const errors = reactive<{ data: ValidationError }>({
  data: cleanErrors,
})

const error = ref('')
const date = ref<Date | null>(null)

const router = useRouter()
const { login } = useAuthStore()

const { isLoading, fetchData, data } = authApi.register()

watch(
  data,
  () => {
    if (data.value) {
      login(data.value.token)
    }
  },
  { immediate: true },
)

const handleRegister = async () => {
  errors.data = cleanErrors
  error.value = ''

  try {
    await fetchData(userData)
    await router.replace('/')
  } catch (e) {
    toast.add({
      closable: true,
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: 'Попробуйте еще раз',
      life: 1500,
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

const isAllDataPassed = computed(() => {
  if (date.value) {
    userData.birth = formatDate(data.value)
  }

  return (
    !isLoading.value &&
    date.value &&
    userData.tel.trim() !== '' &&
    userData.name.trim() !== '' &&
    userData.surname.trim() !== '' &&
    userData.password.trim() !== ''
  )
})
</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden w-full">
    <div class="flex flex-column align-items-center justify-content-center w-full px-3">
      <div
        class="w-full lg:max-w-30rem"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <Toast />
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 55px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Регистрация</div>
          </div>

          <div class="flex justify-content-center mb-3">
            <InlineMessage v-if="error.length" severity="error">{{ error }}</InlineMessage>
          </div>

          <div>
            <div class="flex gap-3 flex-column align-items-center">
              <FormItem
                :invalid="Boolean(errors.data.name?.length)"
                placeholder="Введите имя"
                full
                id="name"
                v-model="userData.name"
                label="Имя"
              />
              <RenderErrors v-if="errors.data.name?.length" :values="errors.data.name" />

              <FormItem
                :invalid="Boolean(errors.data.surname?.length)"
                placeholder="Введите фамилию"
                full
                id="lastname"
                v-model="userData.surname"
                label="Фамилия"
              />
              <RenderErrors v-if="errors.data.surname?.length" :values="errors.data.surname" />

              <div class="flex-auto w-full">
                <label for="birth" class="block text-900 font-medium text-xl mb-2">Дата рождения</label>
                <Calendar
                  :invalid="Boolean(errors.data.birth?.length)"
                  placeholder="Дата рождения"
                  input-class="p-3 w-full"
                  v-model="date"
                  :max-date="new Date()"
                  showIcon
                  :showOnFocus="false"
                  inputId="birth"
                />
                <RenderErrors v-if="errors.data.birth?.length" :values="errors.data.birth" />
              </div>

              <div class="w-full">
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

              <div class="w-full">
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
            </div>

            <div class="flex align-items-center justify-content-between mb-3 mt-3">
              <RouterLink to="/login" class="font-medium no-underline ml-2 text-right cursor-pointer">Уже есть аккаунт?</RouterLink>
            </div>

            <Button :disabled="!isAllDataPassed" label="Войти" class="w-full p-3 text-xl" @click="handleRegister" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
