<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref()
const members = ref([
  {
    name: 'Алик Мотов',
    team_name: 'GeForce Exp'
  },
  {
    name: 'Алик Мотов',
    team_name: 'GeForce Exp'
  },
  {
    name: 'Алик Мотов',
    team_name: 'GeForce Exp'
  }
])

const toggle = (event: MouseEvent) => {
  isVisible.value.toggle(event)
}
</script>

<template>
  <div>
    <button class="p-link layout-menu-button layout-topbar-button" @click="toggle">
      <i class="pi pi-bell"></i>
      <span>Уведомления</span>
    </button>

    <OverlayPanel ref="isVisible">
      <div class="flex flex-column gap-3 w-20rem">
        <div>
          <span class="font-medium text-900 block mb-2">Приглашения в команду</span>
          <ul class="list-none p-0 m-0 flex flex-column gap-3">
            <li v-for="member in members" :key="member.name" class="flex align-items-center gap-2">
              <!--              TODO: разобраться с line-height -->
              <span class="font-medium line-height-2"
                ><Tag severity="info" class="ine-height-2">{{ member.name }}</Tag> приглашает вас в команду
                <Tag class="ine-height-2">{{ member.team_name }}</Tag></span
              >

              <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                <Button icon="pi pi-check" aria-label="Filter" />
                <Button icon="pi pi-times" severity="danger" aria-label="Cancel" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>
