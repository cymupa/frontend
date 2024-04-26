<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useLayout } from './composables/useLayout.ts'
import type { MenuGroup, MenuItem } from './types'

const route = useRoute()

const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } =
  useLayout()

interface Props {
  item: MenuGroup | MenuItem
  index: number
  root?: boolean
  parentItemKey?: string | null
}

const { item, parentItemKey, root, index } = withDefaults(
  defineProps<Props>(),
  {
    root: true
  }
)

const isActiveMenu = ref(false)
const itemKey = ref<null | string>(null)

onBeforeMount(() => {
  itemKey.value = parentItemKey ? `${parentItemKey}-${index}` : String(index)
})

watch(
  () => layoutConfig.activeMenuItem.value,
  (newVal) => {
    isActiveMenu.value = Boolean(
      newVal === itemKey.value || newVal?.startsWith(`${itemKey.value}-`)
    )
  }
)
const itemClick = (_event: MouseEvent, item: MenuItem) => {
  const { overlayMenuActive, staticMenuMobileActive } = layoutState

  if (item.to && (staticMenuMobileActive.value || overlayMenuActive.value)) {
    onMenuToggle()
  }

  const foundItemKey = item.items
    ? isActiveMenu.value
      ? parentItemKey
      : itemKey.value
    : itemKey.value

  setActiveMenuItem(foundItemKey)
}

const checkActiveRoute = (item: MenuItem) => route.path === item.to
</script>

<template>
  <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <div v-if="root" class="layout-menuitem-root-text">
      {{ item.label }}
    </div>

    <transition name="layout-submenu" v-if="item.items">
      <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
        <app-menu-item
          v-for="(child, i) in item.items"
          :key="child.label"
          :index="i"
          :item="child"
          :parentItemKey="itemKey"
          :root="false"
        />
      </ul>
    </transition>

    <router-link
      v-else
      @click="itemClick($event, item as MenuItem)"
      :class="[{ 'active-route': checkActiveRoute(item as MenuItem) }]"
      tabindex="0"
      :to="(item as MenuItem).to"
    >
      <i :class="(item as MenuItem).icon" class="layout-menuitem-icon" />
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items" />
    </router-link>
  </li>
</template>
