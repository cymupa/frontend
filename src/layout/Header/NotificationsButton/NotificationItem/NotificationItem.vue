<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()

const handleConfirmAccept = () => {
  confirm.require({
    message: `Вы действительно хотите вступить в команду ${member.team_name}?`,
    header: 'Подтверждение',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Отмена',
    acceptLabel: 'Вступить',
    accept: () => {
      alert(1)
      // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    },
    reject: () => {
      alert(2)
    }
  })
}

const handleConfirmDecline = () => {
  confirm.require({
    message: `Вы действительно хотите отклонить пришлашение в ${member.team_name}?`,
    header: 'Опасно',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Отклонить',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      alert(1)
      // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    },
    reject: () => {
      alert(2)
    }
  })
}

interface Props {
  index: number
  member: {
    name: string
    team_name: string
  }
}

const { member } = defineProps<Props>()

const handleAcceptClick = async () => {}

const handleDeclineClick = async () => {}
</script>

<template>
  <li>
    <Divider v-if="index !== 0" />

    <div class="flex align-items-center">
      <div class="flex flex-column line-height gap-2">
        <span>
          <span>От </span> <Tag severity="info">{{ member.name }}</Tag>
        </span>

        <span>
          <span>В </span> <Tag>{{ member.team_name }}</Tag>
        </span>
      </div>

      <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
        <ConfirmDialog />
        <Button @click="handleConfirmAccept()" icon="pi pi-check" aria-label="Accept" outlined />
        <Button @click="handleConfirmDecline()" icon="pi pi-times" severity="danger" aria-label="Decline" outlined />
      </div>
    </div>
  </li>
</template>
