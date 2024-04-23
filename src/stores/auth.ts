import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  // const isAdmin = ref(false)
  const token = ref(localStorage.getItem('token') || '')

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
