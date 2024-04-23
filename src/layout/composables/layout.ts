import { reactive, computed, type ComputedRef } from 'vue'
import type { LayoutConfig, LayoutState } from './types'

export const useLayout = () => {
  const layoutConfig = reactive<LayoutConfig>({
    ripple: true,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'aura-light-green',
    scale: 14,
    activeMenuItem: null,
  })

  const layoutState = reactive<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  })

  const setActiveMenuItem = (item: string | null) => {
    layoutConfig.activeMenuItem = item
  }

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const isSidebarActive: ComputedRef<boolean> = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive)

  const isDarkTheme: ComputedRef<boolean> = computed(() => layoutConfig.darkTheme)

  return {
    layoutConfig,
    layoutState,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem,
  }
}
