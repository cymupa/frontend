<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'
import { computed, onBeforeUnmount, ref } from 'vue'

import useClickOutside from './composables/useClickOutside'
import { useLayout } from './composables/useLayout.ts'

const $primevue = usePrimeVue()
const { onMenuToggle, layoutConfig } = useLayout()

const topbarMenuActive = ref<boolean>(false)
const menuButton = ref<HTMLElement | null>(null)

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

const onHeaderButtonClick = () => {
  topbarMenuActive.value = false
}

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  }
})

const { bind: bindOutsideClick, unbind: unbindOutsideClick } = useClickOutside(
  menuButton,
  topbarMenuActive,
  onTopBarMenuButton
)

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
      <RouterLink to="profile" @click="onHeaderButtonClick()" class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
        <span>Профиль</span>
      </RouterLink>

      <RouterLink to="self" @click="onHeaderButtonClick()" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Настройки</span>
      </RouterLink>

      <button @click="onDarkModeChange(!layoutConfig.darkTheme.value)" class="p-link layout-topbar-button">
        <i :class="layoutConfig.darkTheme.value ? 'pi pi-sun' : 'pi pi-moon'"></i>
        <span>Тема</span>
      </button>
    </div>
  </div>
</template>
