<script setup>
import { ref } from 'vue'
import { useFetch } from '@/hooks/useFetch'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const { data, isLoading, error } = await useFetch('authorization', 'POST', {
    login: email.value,
    password: password.value,
  })

  try {
    console.log('isLoading', isLoading.value)
  } catch (e) {
    console.log('isLoading', isLoading.value)
  } finally {
    console.log('isLoading', isLoading.value)
  }
}
</script>

<template>
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

          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText
              id="email1"
              type="text"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="email"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>

            <Password
              id="password1"
              v-model="password"
              placeholder="Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              :inputStyle="{ padding: '1rem' }"
            />

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <RouterLink
                to="/register"
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
              >
                Еще нет аккаунта?
              </RouterLink>
            </div>

            <Button label="Войти" class="w-full p-3 text-xl" @click="handleLogin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
<!--//.pi-eye {
//  transform: scale(1.6);
//  margin-right: 1rem;
//}
//
//.pi-eye-slash {
//  transform: scale(1.6);
//  margin-right: 1rem;
//}-->
