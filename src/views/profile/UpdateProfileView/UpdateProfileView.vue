<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ConfirmPopup from 'primevue/confirmpopup'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { computed, reactive } from 'vue'

import { userApi } from '@/api/requests'
import { useUserStore } from '@/stores/user'

import RenderErrors from '@/components/RenderErrors/RenderErrors.vue'

import { formatDate } from '@/utils/formatDate'
import { isApiError } from '@/utils/isApiError'
import type { ValidationError } from '@/utils/isApiError'
import { logOut } from '@/utils/logOut'

const confirm = useConfirm()
const toast = useToast()

const { state, isError } = storeToRefs(useUserStore())
const { setUserInfo } = useUserStore()
const { fetchData: fetchUserData, data: userData } = userApi.getUserInfo()

type UserDataSubsetKeys =
  | 'tel'
  | 'birth'
  | 'address'
  | 'description'
  | 'name'
  | 'surname'
  | 'patronymic'
  | 'nickname'

const cleanErrors: Record<UserDataSubsetKeys, []> = {
  tel: [],
  birth: [],
  address: [],
  description: [],
  nickname: [],
  name: [],
  surname: [],
  patronymic: []
}

const errors = reactive<{ data: ValidationError }>({
  data: cleanErrors
})

const { fetchData, data, isLoading, error } = userApi.updateUserInfo()

const isButtonBlocked = computed(() => isLoading || !state.value.data.id)

const handleUpdateUserData = async () => {
  errors.data = cleanErrors
  // Не шлем аватар т.к. он обновляется в другой функции
  state.value.data.avatar = undefined

  try {
    await fetchData(
      // @ts-ignore ok
      {
        ...state.value.data,
        birth: formatDate(state.value.data.birth)
      },
      state.value.data.id
    )

    if (!data.value) {
      return
    }

    console.log('data.value', data.value)
  } catch (e) {
    if (!isApiError(e)) {
      return
    }

    if (e?.response?.status === 422) {
      errors.data = e.response.data.errors
      return
    }
  }
}

const onUpload = async (event: FileUploadUploaderEvent) => {
  const files = event.files

  if (!Array.isArray(files) || files.length === 0) {
    return
  }

  const file = files[0]

  await fetchData(
    {
      avatar: file
    },
    state.value.data.id
  )

  await fetchUserData()

  if (!userData.value) {
    return
  }

  setUserInfo(userData.value)
}

// TODO: доделать удаление
const confirmDeleteAccount = async (event: MouseEvent) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'Вы действительно хотите удалить аккаунт?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'Отменить',
    acceptLabel: 'Удалить',
    accept: async () => {
      toast.add({
        severity: 'info',
        summary: 'Удаляю',
        detail: 'Пожалуйста, подождите',
        life: 3000
      })
      await logOut()
    }
  })
}

const confirmLogOut = async (event: MouseEvent) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'Вы действительно хотите выйти из аккаунта?',
    icon: 'pi pi-info-circle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'Отменить',
    acceptLabel: 'Выйти',
    accept: async () => {
      toast.add({
        severity: 'info',
        summary: 'Выхожу',
        detail: 'Пожалуйста, подождите',
        life: 3000
      })
      await logOut()
    }
  })
}
</script>

<template>
  <Toast />
  <ConfirmPopup />

  <div class="card" v-if="(error || isError) && Object.values(errors.data).every((array) => array.length === 0)">
    <Message severity="error" :closable="false">Ошибка при получении данных</Message>
  </div>
  <div v-else-if="isLoading || !state?.data?.id" class="card flex justify-content-center">
    <ProgressSpinner />
  </div>
  <template v-else>
    <div class="col-12">
      <div class="card">
        <h5>Информация о вас</h5>
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="firstname">Имя</label>
            <InputText id="firstname" type="text" v-model="state.data.name" />
            <RenderErrors v-if="errors.data.name?.length" :values="errors.data.name" />
          </div>

          <div class="field col-12 md:col-4">
            <label for="lastname">Фамилия</label>
            <InputText id="lastname" type="text" v-model="state.data.surname" />
            <RenderErrors v-if="errors.data.surname?.length" :values="errors.data.surname" />
          </div>

          <div class="field col-12 md:col-4">
            <label for="patronymic">Отчество</label>
            <InputText id="patronymic" type="text" v-model="state.data.patronymic" />
            <RenderErrors v-if="errors.data.patronymic?.length" :values="errors.data.patronymic" />
          </div>

          <div class="field col-12">
            <label for="about">О вас</label>
            <Textarea auto-resize id="about" rows="4" v-model="state.data.description" />
            <RenderErrors v-if="errors.data.description?.length" :values="errors.data.description" />
          </div>

          <div class="field col-12 md:col-6">
            <label for="phone">Телефон</label>
            <InputText id="phone" type="text" v-model="state.data.tel" />
            <RenderErrors v-if="errors.data.tel?.length" :values="errors.data.tel" />
          </div>

          <div class="field col-12 md:col-6">
            <label for="address">Адрес</label>
            <InputText id="address" type="text" v-model="state.data.address" />
            <RenderErrors v-if="errors.data.address?.length" :values="errors.data.address.tel" />
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
            <RenderErrors v-if="errors.data.birth?.length" :values="errors.data.birth" />
          </div>

          <div class="field col-12 md:col-6">
            <label for="nickname">Ник</label>
            <InputText id="nickname" type="text" v-model="state.data.nickname" />
            <RenderErrors v-if="errors.data.nickname?.length" :values="errors.data.nickname" />
          </div>
        </div>

        <Button class="mt-4" @click="handleUpdateUserData" :disabled="isButtonBlocked.value">Сохранить</Button>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5 class="mb-3">Аватар</h5>

        <FileUpload name="avatar" @uploader="onUpload" :multiple="false" accept="image/*" :maxFileSize="1000000" custom-upload>
          <template #empty>
            <p>Перетащите файл для загрузки.</p>
          </template>
        </FileUpload>
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <h5>Действия</h5>

        <div class="flex flex-column gap-2 align-items-start">
          <Button @click="confirmLogOut" severity="help" :disabled="isButtonBlocked.value">Выйти</Button>
          <Button
            @click="confirmDeleteAccount"
            v-if="!isButtonBlocked.value && !isError && !error"
            severity="danger"
            :disabled="isButtonBlocked.value"
            label="Удалить аккаунт"
          />
        </div>
      </div>
    </div>
  </template>
</template>
