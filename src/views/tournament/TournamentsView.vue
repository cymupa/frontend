<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { reactive, ref } from 'vue'

import { tournamentsData } from '@/data'
import router from '@/router'
import type { Game } from '@/types/Game'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import SmallText from '@/components/SmallText/SmallText.vue'

const toast = useToast()
const tournaments = reactive(tournamentsData)

const getTagStyle = (game: keyof typeof Game) => {
  switch (game) {
    case 'Dota 2':
      return 'info'
    case 'CS2':
      return 'success'
    case 'Mobile':
      return 'secondary'
    case 'LoL':
      return 'warning'
    default:
      return 'contrast'
  }
}

// const filter = ref(0);
// // const filterValues = ref([100, 100, 0]);
// const filterOptions = ref([
//   { label: 'Все', value: 0 },
//   { label: 'Dota 2', value: 1 },
//   { label: 'CS2', value: 2 },
//   { label: 'Mobile Legends', value: 3 },
//   { label: 'League Of Legends', value: 4 }
// ]);

const items = [
  {
    label: 'Update',
    command: () => {
      toast.add({
        severity: 'success',
        summary: 'Updated',
        detail: 'Data Updated',
        life: 3000
      })
    }
  },
  {
    label: 'Delete',
    command: () => {
      toast.add({
        severity: 'warn',
        summary: 'Delete',
        detail: 'Data Deleted',
        life: 3000
      })
    }
  },
  {
    label: 'Vue Website',
    command: () => {
      window.location.href = 'https://vuejs.org/'
    }
  },
  { label: 'Upload', to: '/fileupload' }
]

const save = () => {
  toast.add({
    closable: false,
    severity: 'success',
    summary: 'Success',
    detail: 'Data Saved',
    // life: 3000
  })
}
</script>

<template>
  <ScrollWrapper>
<!--    <SelectButton v-model="filter" :options="filterOptions" optionLabel="label" optionValue="value" class="mb-3" />-->
    <SplitButton label="Фильтр" @click="save" :model="items" />
    <Toast  />

    <DataView data-key="id" :value="tournaments">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in tournaments" :key="item.id" class="col-12">
            <div
              class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-2"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div
                class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 md:gap-2 gap-4"
              >
                <div class="md:w-5 flex md:flex-column justify-content-between gap-2">
                  <div>
                    <SmallText>{{ item.dates }}</SmallText>
                    <MainTitle>{{ item.title }}</MainTitle>
                    <!--                    'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'contrast'-->
                    <Tag :value="item.game" :severity="getTagStyle(item.game)" />
                  </div>
                </div>

                <div class="flex flex-column md:align-items-end gap-5">
                  <div class="flex flex-column gap-2">
                    <SmallText>Кол-во команд:</SmallText>
                    <span class="text-xl font-semibold text-900">{{ item.teamsCount }}</span>
                  </div>
                </div>

                <div class="flex flex-column md:align-items-end gap-5">
                  <div class="flex flex-column gap-2">
                    <SmallText>Призовой фонд:</SmallText>
                    <span class="text-xl font-semibold text-900">${{ item.totalPrize }}</span>
                  </div>
                </div>

                <Button
                  size="small"
                  icon="pi pi-arrow-right"
                  @click="router.push(`tournament/${item.id}`)"
                  label="Перейти"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </ScrollWrapper>
</template>

<style scoped></style>

<!--<template>
    <div class="card flex justify-content-center">
        <Toast position="bottom-center" group="bc" @close="onClose">
            <template #message="slotProps">
                <div class="flex flex-column align-items-start" style="flex: 1">
                    <div class="flex align-items-center gap-2">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold text-900">Amy Elsner</span>
                    </div>
                    <div class="font-medium text-lg my-3 text-900">{{ slotProps.message.summary }}</div>
                    <Button class="p-button-sm" label="Reply" @click="onReply()"></Button>
                </div>
            </template>
        </Toast>
        <Button @click="showTemplate" label="View" />
    </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';
const toast = useToast();
const visible = ref(false);

const showTemplate = () => {
    if (!visible.value) {
        toast.add({ severity: 'success', summary: 'Can you send me the report?', group: 'bc' });
        visible.value = true;
    }
};

const onReply = () => {
    toast.removeGroup('bc');
    visible.value = false;
}

const onClose = () => {
    visible.value = false;
}
</script>

Headless-->