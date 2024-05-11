<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'
import { onBeforeUnmount, ref } from 'vue'

import useClickOutside from '../composables/useClickOutside'
import { useLayout } from '../composables/useLayout'

import CartButton from '@/layout/Header/CartButton/CartButton.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import NotificationsButton from './NotificationsButton/NotificationsButton.vue'

const $primevue = usePrimeVue()
const { onMenuToggle, layoutConfig } = useLayout()

const { isLoggedIn } = storeToRefs(useAuthStore())

const topbarMenuActive = ref<boolean>(false)
const menuButton = ref<HTMLElement | null>(null)

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}

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

    <div class="layout-topbar-menu">
      <button @click="onDarkModeChange(!layoutConfig.darkTheme.value)" class="p-link layout-topbar-button">
        <i :class="layoutConfig.darkTheme.value ? 'pi pi-sun' : 'pi pi-moon'"></i>
        <span>Тема</span>
      </button>

      <template v-if="isLoggedIn">
        <NotificationsButton />
        <CartButton />
      </template>
    </div>
  </div>
</template>
