export const isOutsideClicked = (event: MouseEvent) => {
  const sidebarEl = document.querySelector('.layout-sidebar')!
  const topbarEl = document.querySelector('.layout-menu-button')!

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
