export interface MenuItem {
  label: string
  icon: string
  to: string
  items?: MenuItem[]
}

export interface MenuGroup {
  label: string
  items: MenuItem[]
}
