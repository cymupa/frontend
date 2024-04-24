import { reactive } from 'vue'
import { defineStore } from 'pinia'

interface User {
  fullName: string
  teamId: number | null
  isCaptain: boolean
}

export const useUserStore = defineStore('user', () => {
  const state: User = reactive({
    fullName: '',
    teamId: null,
    isCaptain: false,
  })

  const setUserInfo = (data: User): void => {
    Object.assign(state, data)
  }

  const setTeamId = (id: number | null): void => {
    state.teamId = id
  }

  const setIsCaptain = (status: boolean): void => {
    state.isCaptain = status
  }

  return {
    ...state,
    setUserInfo,
    setTeamId,
    setIsCaptain,
  }
})
