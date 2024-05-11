export interface Team {
  id: number
  name: string
  description: string
  photo: string
  captain: TeamMember
  team_list: TeamMember[]
}

export interface TeamMember {
  id: number
  nickname: null | string
  name: string
  surname: string
  avatar: string | null
}
