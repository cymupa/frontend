import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import type { User } from '@/types/User'

interface UserStore {
  isCaptain?: boolean
  teamId?: number | null
}

export const useUserStore = defineStore('user', () => {
  const isError = ref(false)

  const state: { data: User & UserStore } = reactive({
    data: {
      id: 0,
      tel: '',
      name: '',
      birth: new Date(),
      surname: '',
      role_id: 1,
      avatar: null,
      address: null,
      nickname: null,
      patronymic: null,
      description: null,

      remember_token: '',

      created_at: '',
      updated_at: '',

      isCaptain: false,
      teamId: null
    }
  })

  const setUserInfo = (data: User): void => {
    state.data = {
      ...data,
      birth: new Date(data.birth)
    }
  }

  const setTeamId = (id: number | null): void => {
    state.data.teamId = id
  }

  const setIsCaptain = (status: boolean): void => {
    state.data.isCaptain = status
  }

  return {
    state,
    setUserInfo,
    setTeamId,
    setIsCaptain,
    isError
  }
})
