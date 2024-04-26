<template>
  <div class="card">
    <DataTable :value="tournamentsData">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Турниры</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>

      <Column field="name" header="Название" #body="slotProps">
        <RouterLink :to="`tournament/${slotProps.data.id}`">{{ slotProps.data.title }}</RouterLink>
      </Column>

      <Column field="rating" header="Кол-во команд">
        <template #body="slotProps"> {{ slotProps.data.teamsCount }} </template>
      </Column>

      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ slotProps.data.totalPrize }}
        </template>
      </Column>

      <Column field="category" header="Игра">
        <template #body="slotProps">
          {{ slotProps.data.game }}
        </template>
      </Column>

      <template #footer>Всего {{ tournamentsData ? tournamentsData.length : 0 }} турниров. </template>
    </DataTable>
  </div>
</template>

<script setup>
import { tournamentsData } from '@/data'
import { reactive } from 'vue'

const tournaments = reactive(tournamentsData)
</script>
