export interface User {
  id: number
  tel: string
  name: string
  birth: string
  role_id: number
  surname: string
  address: string | null
  avatar: string | null
  nickname: string | null
  patronymic: null | string
  description: string | null

  remember_token: string

  created_at: string
  updated_at: string

  // team_id: string | null
}
