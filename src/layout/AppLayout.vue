<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useLoadStore } from '@/stores/load'
import { useLayout } from './composables/useLayout'

import AuthProvider from '@/providers/AuthProvider.vue'
import AppMenu from './AppSidebar.vue'
import AppHeader from './Header/AppHeader.vue'

const { layoutConfig, layoutState, isSidebarActive } = useLayout()
const isLoading = useLoadStore()

type cb = (event: MouseEvent) => void

const outsideClickListener = ref<cb | null>(null)

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener()
  } else {
    unbindOutsideClickListener()
  }
})

const containerClass = computed(() => {
  return {
    'layout-theme-light': !layoutConfig.darkTheme.value,
    'layout-theme-dark': layoutConfig.darkTheme.value,
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive.value &&
      layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-ripple-disabled': !layoutConfig.ripple.value
  }
})

const bindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    return
  }

  outsideClickListener.value = (event: MouseEvent) => {
    if (isOutsideClicked(event)) {
      layoutState.overlayMenuActive.value = false
      layoutState.staticMenuMobileActive.value = false
      layoutState.menuHoverActive.value = false
    }
  }

  document.addEventListener('click', outsideClickListener.value)
}
const unbindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    return
  }

  document.removeEventListener('click', outsideClickListener.value)
  outsideClickListener.value = null
}

const isOutsideClicked = (event: MouseEvent) => {
  const sidebarEl = document.querySelector('.layout-sidebar')!
  const topbarEl = document.querySelector('.layout-menu-button')!

  const target = event.target as Node

  return !(
    sidebarEl.isSameNode(target) ||
    sidebarEl.contains(target) ||
    topbarEl.isSameNode(target) ||
    topbarEl.contains(target)
  )
}
</script>

<template>
  <AuthProvider>
    <div class="layout-wrapper" :class="containerClass">
      <AppHeader />
      <div class="layout-sidebar">
        <AppMenu />
      </div>
      <div class="layout-main-container">
        <div class="layout-main">
          <div v-if="isLoading.state" class="card flex justify-content-center">
            <ProgressSpinner />
          </div>

          <router-view v-else />
        </div>
      </div>
      <div class="layout-mask"></div>
    </div>
  </AuthProvider>
</template>
