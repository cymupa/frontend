import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const t = localStorage.getItem('token')
  const isLoggedIn = ref(Boolean(t))
  const token = ref(t || '')

  const login = (tokenValue: string) => {
    console.log('[Store] Auth token: ', tokenValue)

    token.value = tokenValue
    localStorage.setItem('token', tokenValue)
    isLoggedIn.value = true
  }

  const logout = () => {
    localStorage.removeItem('token')
    token.value = ''
    isLoggedIn.value = false
  }

  return { token, login, logout, isLoggedIn }
})
