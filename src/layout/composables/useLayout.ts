import { type ComputedRef, computed, reactive, toRefs } from 'vue'
import type { LayoutConfig, LayoutState } from './types'

const layoutConfig = reactive<LayoutConfig>({
  ripple: true,
  darkTheme: false,
  inputStyle: 'outlined',
  menuMode: 'static',
  theme: 'aura-light-green',
  scale: 14,
  activeMenuItem: null
})

const layoutState = reactive<LayoutState>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false
})

export const useLayout = () => {
  const setActiveMenuItem = (item: string | null | undefined) => {
    layoutConfig.activeMenuItem = item
  }

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const isSidebarActive: ComputedRef<boolean> = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive
  )

  const isDarkTheme: ComputedRef<boolean> = computed(
    () => layoutConfig.darkTheme
  )

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem
  }
}
