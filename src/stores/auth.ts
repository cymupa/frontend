import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const t = localStorage.getItem('token')
  const isLoggedIn = ref(Boolean(t))
  // const isAdmin = ref(false)
  const token = ref(t || '')

  function login(tokenValue: string) {
    token.value = tokenValue
    localStorage.setItem('token', tokenValue)
    isLoggedIn.value = true
  }

  function logout() {
    localStorage.removeItem('token')
    token.value = ''
    isLoggedIn.value = false
  }

  // function checkAdmin() {
  //   isAdmin.value = true
  // }

  return { token, login, logout }
})
