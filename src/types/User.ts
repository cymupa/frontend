export interface User {
  id: number
  tel: string
  name: string
  birth: Date
  role_id?: number
  surname: string
  address: string | null
  avatar?: File | string | null
  nickname: string | null
  patronymic: null | string
  description: string | null

  remember_token: string

  created_at: Date
  updated_at: Date

  team: number | null
  isCaptain: boolean | null
}
