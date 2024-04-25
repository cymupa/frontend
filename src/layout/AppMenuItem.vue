<script setup lang="ts">
import { ref, onBeforeMount, watch, PropType } from 'vue'
import { useRoute } from 'vue-router'

import { useLayout } from '@/layout/composables/layout'
import type { MenuItem } from '@/layout/types'

const route = useRoute()

const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout()

interface Props {
  item: MenuItem
  index: number
  root?: boolean
  parentItemKey?: string | null
}

const { item, parentItemKey, root, index } = withDefaults(defineProps<Props>(), {
  root: true,
})

const isActiveMenu = ref(false)
const itemKey = ref<null | string>(null)

onBeforeMount(() => {
  itemKey.value = parentItemKey ? parentItemKey + '-' + index : String(index)
})

watch(
    () => layoutConfig.activeMenuItem.value,
    (newVal) => {
      isActiveMenu.value = Boolean(newVal === itemKey.value || newVal?.startsWith(itemKey.value + '-'))
    },
)
const itemClick = (_event: MouseEvent, item: MenuItem) => {
  const { overlayMenuActive, staticMenuMobileActive } = layoutState

  if (item.to && (staticMenuMobileActive.value || overlayMenuActive.value)) {
    onMenuToggle()
  }

  const foundItemKey = item.items ? (isActiveMenu.value ? parentItemKey : itemKey.value) : itemKey.value

  setActiveMenuItem(foundItemKey)
}

const checkActiveRoute = (item: MenuItem) => route.path === item.to
</script>

<template>
  <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
    <div v-if="root" class="layout-menuitem-root-text">
      {{ item.label }}
    </div>
    <a v-if="!item.to || item.items" @click="itemClick($event, item)" tabindex="0">
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </a>

    <router-link
        v-if="item.to && !item.items"
        @click="itemClick($event, item)"
        :class="[{ 'active-route': checkActiveRoute(item) }]"
        tabindex="0"
        :to="item.to"
    >
      <i :class="item.icon" class="layout-menuitem-icon"></i>
      <span class="layout-menuitem-text">{{ item.label }}</span>
      <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.items"></i>
    </router-link>

    <Transition v-if="item.items" name="layout-submenu">
      <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
        <app-menu-item
            v-for="(child, i) in item.items"
            :key="child.to"
            :index="i"
            :item="child"
            :parentItemKey="itemKey"
            :root="false"
        />
      </ul>
    </Transition>
  </li>
</template>
