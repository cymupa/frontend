<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import { computed, onMounted, ref, watch } from 'vue'

import { userApi } from '@/api/requests'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/formatDate'

const { state, isError } = storeToRefs(useUserStore())

const { fetchData, data, isLoading, error } = userApi.updateUserInfo()

const isButtonBlocked = computed(() => !isLoading)

const handleUpdateUserData = async () => {
  try {
    await fetchData(
      {
        ...state.value.data,
        // @ts-ignore ok
        birth: formatDate(state.value.data.birth)
      },
      state.value.data.id
    )

    if (!data.value) {
      return
    }

    console.log('data.value', data.value)
  } catch (e) {
    console.log('aaaaaaaaaaaa')
  }
}

const onUpload = async (event: FileUploadUploaderEvent) => {
  const files = event.files

  if (!Array.isArray(files) || files.length === 0) {
    return
  }

  const file = files[0]

  const formData = new FormData()
  formData.append('avatar', file)

  await fetchData(
    {
      avatar: file
    },
    state.value.data.id
  )
}
</script>

<template>
  <div class="card"  v-if="error || isError">
    <Message severity="error"  :closable="false">Ошибка при получении данных</Message>
  </div>
  <div v-else-if="!state.data.id" class="card flex justify-content-center">
    <ProgressSpinner />
  </div>
  <div class="col-12" v-else>
    <div class="card">
      <h5>Информация о вас</h5>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-4">
          <label for="firstname">Имя</label>
          <InputText id="firstname" type="text" v-model="state.data.name" />
        </div>

        <div class="field col-12 md:col-4">
          <label for="lastname">Фамилия</label>
          <InputText id="lastname" type="text" v-model="state.data.surname" />
        </div>

        <div class="field col-12 md:col-4">
          <label for="patronymic">Отчество</label>
          <InputText id="patronymic" type="text" v-model="state.data.patronymic" />
        </div>

        <div class="field col-12">
          <label for="about">О вас</label>
          <Textarea auto-resize id="about" rows="4" v-model="state.data.description" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="phone">Телефон</label>
          <InputText id="phone" type="text" v-model="state.data.tel" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="address">Адрес</label>
          <InputText id="address" type="text" v-model="state.data.address" />
        </div>

        <div class="field col-12 md:col-6">
          <label for="birth">Дата рожедния</label>
          <Calendar
            placeholder="Дата рождения"
            :max-date="new Date()"
            v-model="state.data.birth"
            showIcon
            :showOnFocus="false"
            inputId="birth"
          />
        </div>

        <div class="field col-12 md:col-6">
          <label for="nickname">Ник</label>
          <InputText id="nickname" type="text" v-model="state.data.nickname" />
        </div>
      </div>

      <label for="avatar" class="mb-2 block">Аватар</label>
      <FileUpload name="avatar" @uploader="onUpload" :multiple="false" accept="image/*" :maxFileSize="1000000" custom-upload>
        <template #empty>
          <p>Перетащите файл для загрузки.</p>
        </template>
      </FileUpload>

      <Button class="mt-4" @click="handleUpdateUserData" :disabled="isButtonBlocked">Сохранить</Button>
    </div>
  </div>

  <div class="col-12">
    <div class="card">
      <h5>Действия</h5>

      <div class="flex flex-column gap-2 align-items-start">
        <Button v-if="!isButtonBlocked && !isError && !error" severity="danger" :disabled="isButtonBlocked">Удалить аккаунт</Button>
        <Button severity="help" :disabled="isButtonBlocked">Выйти</Button>
      </div>
    </div>
  </div>
</template>
