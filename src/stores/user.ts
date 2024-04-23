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

  function setUserInfo(data: User): void {
    Object.assign(state, data)
  }

  function setTeamId(id: number | null): void {
    state.teamId = id
  }

  function setIsCaptain(status: boolean): void {
    state.isCaptain = status
  }

  return {
    ...state,
    setUserInfo,
    setTeamId,
    setIsCaptain,
  }
})
