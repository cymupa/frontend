<script lang="ts" setup>
import { authApi } from '@/api/requests'
import { reactive, ref } from 'vue'

import type { RegistrationRequest } from '@/api/types'
import FormItem from '@/components/FormItem/FormItem.vue'

const userData = reactive<RegistrationRequest>({
  tel: '',
  avatar: undefined,
  birth: '',
  name: '',
  surname: '',
  password: ''
})

const handleLogin = async () => {
  const { isLoading, fetchData } = authApi.register(userData)

  try {
    console.log('isLoading', isLoading.value)
    await fetchData()
  } catch (e) {
    console.error('isLoading', isLoading.value)
  } finally {
    console.log('isLoading', isLoading.value)
  }
}
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
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 55px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Регистрация</div>
          </div>

          <div>
            <div class="flex gap-3 flex-column align-items-center">
              <FormItem full class="" id="phone" v-model="userData.tel" label="Имя" />
              <FormItem full id="phone" v-model="userData.tel" label="Фамилия" />

              <div class="flex-auto w-full">
                <label for="birth" class="block text-900 font-medium text-xl mb-2">Дата рождения</label>
                <Calendar input-class="p-3 w-full" v-model="userData.birth" :max-date="new Date()" showIcon :showOnFocus="false" inputId="birth" />
              </div>

              <div class="w-full">
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Пароль</label>
                <Password
                  id="password1"
                  v-model="userData.password"
                  placeholder="Password"
                  :toggleMask="true"
                  class="w-full"
                  input-class="w-full p-3"
                />
              </div>

              <FormItem full id="phone" v-model="userData.tel" label="Телефон" />
            </div>


            <div class="flex align-items-center justify-content-between mb-3 mt-3">
              <RouterLink to="/login" class="font-medium no-underline ml-2 text-right cursor-pointer"> Уже есть аккаунт? </RouterLink>
            </div>

            <Button label="Войти" class="w-full p-3 text-xl" @click="handleLogin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
