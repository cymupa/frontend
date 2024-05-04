export interface MenuItem {
  label: string
  icon: string
  to: string
}

export interface MenuGroup {
  label: string
  items: MenuItem[]
}
