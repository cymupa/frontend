<script setup lang="ts">
import { ref } from 'vue'

import { invitesToTeam } from '@/data'

import NotificationItem from './NotificationItem/NotificationItem.vue'

const isVisible = ref()
const members = ref([])

const toggle = (event: MouseEvent) => {
  isVisible.value.toggle(event)
}
</script>

<template>
  <div>
    <button class="p-link layout-menu-button layout-topbar-button" @click="toggle">
      <i v-if="members.length" v-badge="members.length" class="pi pi-bell"></i>
      <i v-else class="pi pi-bell"></i>
      <span>Уведомления</span>
    </button>

    <OverlayPanel ref="isVisible">
      <div class="flex flex-column gap-3 w-20rem">
        <div>
          <span class="font-medium text-900 block mb-2">{{ members.length ? 'Приглашения в команду' : 'Нет приглашений' }}</span>

          <ul class="list-none p-0 m-0 flex flex-column">
            <NotificationItem v-for="(member, index) in members" :key="member.name" :member="member" :index="index" />
          </ul>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>
