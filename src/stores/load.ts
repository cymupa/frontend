import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadStore = defineStore('load', () => {
  const state = ref(false)

  const changeState = (value: boolean) => {
    state.value = value
  }

  return { state, changeState }
})
