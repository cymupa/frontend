<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usePrimeVue } from 'primevue/config'

import { useLayout } from '@/layout/composables/layout'
import useClickOutside from './composables/useClickOutside'

const router = useRouter()
const $primevue = usePrimeVue()
const { onMenuToggle, layoutConfig } = useLayout()

const topbarMenuActive = ref<boolean>(false)
const menuButton = ref<HTMLElement | null>(null)

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

const onHeaderButtonClick = (name: 'self-edit' | 'profile') => {
  topbarMenuActive.value = false
  router.push({ name })
}

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value,
  }
})

const { bind: bindOutsideClick, unbind: unbindOutsideClick } = useClickOutside(menuButton, topbarMenuActive)

const onChangeTheme = (theme: string, mode: boolean) => {
  localStorage.setItem('theme', theme)

  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme
    layoutConfig.darkTheme.value = mode
  })
}

const onDarkModeChange = (value: boolean) => {
  const newThemeName = value
    ? layoutConfig.theme.value.replace('light', 'dark')
    : layoutConfig.theme.value.replace('dark', 'light')

  layoutConfig.darkTheme.value = value
  onChangeTheme(newThemeName, value)
}

bindOutsideClick()
onBeforeUnmount(unbindOutsideClick)
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <span>CyTurs</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      ref="menuButton"
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onHeaderButtonClick('profile')" class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
        <span>Профиль</span>
      </button>

      <button @click="onHeaderButtonClick('self-edit')" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Настройки</span>
      </button>

      <button @click="onDarkModeChange(!layoutConfig.darkTheme.value)" class="p-link layout-topbar-button">
        <i :class="layoutConfig.darkTheme.value ? 'pi pi-moon' : 'pi pi-sun'"></i>
        <span>Theme</span>
      </button>
    </div>
  </div>
</template>
