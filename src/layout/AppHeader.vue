<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from 'vue'
import { useLayout } from '@/layout/composables/layout'
import { useRouter } from 'vue-router'
import { usePrimeVue } from 'primevue/config'

const { onMenuToggle } = useLayout()

const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)
const router = useRouter()

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

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

const bindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    return
  }

  outsideClickListener.value = (event) => {
    if (isOutsideClicked(event)) {
      topbarMenuActive.value = false
    }
  }
  document.addEventListener('click', outsideClickListener.value)
}
const unbindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    return
  }
  document.removeEventListener('click', outsideClickListener)
  outsideClickListener.value = null
}
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return

  const sidebarEl = document.querySelector('.layout-topbar-menu')!
  const topbarEl = document.querySelector('.layout-topbar-menu-button')!

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
const { layoutConfig } = useLayout()
const $primevue = usePrimeVue()

const onChangeTheme = (theme: string, mode: string) => {
  localStorage.setItem('theme', theme)

  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme
    layoutConfig.darkTheme.value = mode
  })
}

const onDarkModeChange = (value: boolean) => {
  const newThemeName = value ? layoutConfig.theme.value.replace('light', 'dark') : layoutConfig.theme.value.replace('dark', 'light')
  layoutConfig.darkTheme.value = value
  onChangeTheme(newThemeName, value)
}

onBeforeMount(() => {
  const theme = localStorage.getItem('theme')
  if (!theme) {
    return
  }

  $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
    layoutConfig.theme.value = theme
    console.log(theme)
    layoutConfig.darkTheme.value = theme.includes('dark')
  })
})
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <span>CyTurs</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <section class="flex align-items-center gap-10">
        <InputSwitch role="button" :modelValue="layoutConfig.darkTheme.value" @update:modelValue="onDarkModeChange" />
      </section>

      <button @click="onHeaderButtonClick('profile')" class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>

      <button @click="onHeaderButtonClick('self-edit')" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
