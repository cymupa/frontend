<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref, watch } from 'vue'

import { STORAGE_URL } from '@/config/env'

import { categoriesApi, productsApi } from '@/api/requests'
import type { GetCategoriesResponse, GetProductsResponse } from '@/api/types'

import { isApiError } from '@/utils/isApiError'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'

const toast = useToast()

const productsList = ref<GetProductsResponse[]>([])
const categories = ref<GetCategoriesResponse[]>([])

const {
  data: productsData,
  fetchData: fetchProducts,
  isLoading: isProductsLoading,
  error: productsError
} = productsApi.getAll()
const {
  data: categoriesData,
  fetchData: fetchCategories,
  isLoading: isCategoriesLoading,
  error: categoriesError
} = categoriesApi.getAll()

const getProducts = async () => {
  try {
    await fetchProducts({})

    if (!productsData.value) {
      return
    }

    productsList.value = productsData.value
  } catch (e) {
    if (!isApiError(e)) {
      return
    }

    console.warn(e)
  }
}

const getCategories = async () => {
  try {
    await fetchCategories({})

    if (!categoriesData.value) {
      return
    }

    categories.value = categoriesData.value
  } catch (e) {
    if (!isApiError(e)) {
      return
    }

    console.warn(e)
  }
}

onMounted(() => Promise.all([getProducts(), getCategories()]))

interface Item {
  label: string
  command: () => void
}

const filter = ref<string>('Все')
const items = ref<Item[]>([])

const isSomeLoading = computed(() => isCategoriesLoading || isProductsLoading)

watch(categories, async () => {
  if (categories.value.length > 0) {
    items.value = [
      {
        label: 'Все',
        command: () => {
          filter.value = 'All'
          toast.add({
            severity: 'success',
            summary: 'Все',
            life: 3000
          })
        }
      },
      ...categories.value.map((category) => ({
        label: category.name,
        command: () => {
          filter.value = category.name
          toast.add({
            severity: 'success',
            summary: category.name,
            life: 3000
          })
        }
      }))
    ]
  }
})
</script>

<template>
  <Toast />
  <ScrollWrapper>
    <MainTitle bold>Список товаров</MainTitle>

    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isProductsLoading" />
      <Message severity="error" :closable="false" v-else-if="productsError">Ошибка</Message>
      <Message v-else-if="!productsList.length" :closable="false">Продуктов нет</Message>
    </div>

    <div v-if="productsList.length">
      <Message v-if="isCategoriesLoading" :closable="false">Загружаю...</Message>
      <Message v-else-if="categoriesError" severity="error" :closable="false">Ошибка</Message>
      <Message v-else-if="!categories.length" :closable="false">Категории не найдены</Message>
      <SplitButton :disabled="isSomeLoading.value" v-else :label="filter" :model="items" />

      <DataView :value="productsList" data-key="id">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div
                class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
                :class="{ 'border-top-1 surface-border': index !== 0 }"
              >
                <div class="md:w-10rem relative">
                  <img class="block xl:block mx-auto border-round w-full" :src="`${STORAGE_URL}/${item.photo}`" :alt="item.name" />
                </div>

                <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                  <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                    <div>
                      <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                      <span class="font-medium text-secondary text-sm">{{ item.description }}</span>
                    </div>
                  </div>

                  <div class="flex flex-column md:align-items-end gap-5">
                    <span class="text-xl font-semibold text-900">{{ item.price }} Р</span>
                    <Button
                      icon="pi pi-cart-arrow-down"
                      label="Купить"
                      :disabled="isSomeLoading.value"
                      class="flex-auto md:flex-initial white-space-nowrap"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </ScrollWrapper>
</template>

<style scoped></style>
