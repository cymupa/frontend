<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { computed, effect, onMounted, ref, watch } from 'vue'

import { STORAGE_URL } from '@/config/env'

import { cartApi, categoriesApi, productsApi } from '@/api/requests'
import type { GetCategoriesResponse, GetProductsResponse } from '@/api/types'

import MainTitle from '@/components/MainTitle/MainTitle.vue'
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue'
import { useCartStore } from '@/stores/cart'

const toast = useToast()

const layout = ref<'grid' | 'list'>('grid')

const productsList = ref<GetProductsResponse[]>([])
const categories = ref<GetCategoriesResponse[]>([])

const { addToCart, isItemExists, getActualCart } = useCartStore()
const { state } = storeToRefs(useCartStore())

watch(
  state,
  () => {
    console.log('alert')
  },
  { immediate: true }
)

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

const {
  data: addToCartData,
  fetchData: fetchAddToCart,
  isLoading: isCartLoading,
  error: addToCartError
} = cartApi.addToCart()

const getProducts = async () => {
  await fetchProducts({})

  if (!productsData.value) {
    return
  }

  productsList.value = productsData.value
}

const getCategories = async () => {
  await fetchCategories()

  if (!categoriesData.value) {
    return
  }

  categories.value = categoriesData.value
}

onMounted(
  async () =>
    await Promise.all([getActualCart(), getCategories(), getProducts()])
)

interface Item {
  label: string
  command: () => void
}

const filter = ref<string>('Все')
const items = ref<Item[]>([])

const isSomeLoading = computed(
  () => isCategoriesLoading || isProductsLoading || isCartLoading
)

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

const handleAddToCart = async (id: number) => {
  await fetchAddToCart({
    product_id: id,
    quantity: 1
  })

  addToCart(id)
}
</script>

<template>
  <Toast />
  <ScrollWrapper>
    <MainTitle bold>Список товаров</MainTitle>

    <Message v-if="isCategoriesLoading" :closable="false">Загружаю...</Message>
    <Message v-else-if="categoriesError" severity="error" :closable="false">Ошибка</Message>
    <Message v-else-if="!categories.length" :closable="false">Категории не найдены</Message>
    <SplitButton :disabled="isSomeLoading.value" v-else :label="filter" :model="items" />

    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isProductsLoading" />
      <Message severity="error" :closable="false" v-else-if="productsError">Ошибка</Message>
      <Message v-else-if="!productsList.length" :closable="false">Продуктов нет</Message>
    </div>

    <div v-if="productsList.length">
      <DataView :value="productsList" data-key="id" :layout="layout">
        <template #header>
          <div class="flex justify-content-end">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </template>

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
                    </div>

                    <div class="surface-100 p-1" style="border-radius: 30px">
                      <div
                        class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2"
                        style="
                          border-radius: 30px;
                          box-shadow:
                            0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                            0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                        "
                      >
                        <div>{{ item.quantity }} шт.</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-column md:align-items-end gap-5">
                    <span class="text-xl font-semibold text-900">{{ item.price }} Р</span>
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button
                        v-if="isItemExists(item.id)"
                        severity="secondary"
                        icon="pi pi-shopping-cart"
                        label="В корзине / Кончилось"
                        disabled
                      />
                      <Button
                        v-else
                        icon="pi pi-cart-arrow-down"
                        label="Купить"
                        @click="handleAddToCart(item.product_id)"
                        :disabled="isSomeLoading.value && item.quantity"
                        class="flex-auto md:flex-initial white-space-nowrap"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 xl:col-6 p-2">
              <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                <div class="surface-50 flex justify-content-center border-round p-3">
                  <div class="relative mx-auto">
                    <img class="border-round w-full" :src="`${STORAGE_URL}/${item.photo}`" :alt="item.name" style="max-width: 300px" />
                  </div>
                </div>

                <div class="pt-4">
                  <div class="flex flex-row justify-content-between align-items-start gap-2">
                    <div>
                      <div class="text-lg font-medium text-900 mt-1">{{ item.name }}</div>
                    </div>
                    <div class="surface-100 text-center p-1" style="border-radius: 5px">
                      <div>{{ item.quantity }} шт.</div>
                    </div>
                  </div>
                  <div class="flex flex-column gap-4 mt-4">
                    <span class="text-2xl font-semibold text-900">{{ item.price }} Р</span>
                    <div class="flex gap-2">
                      <Button
                        severity="secondary"
                        v-if="isItemExists(item.id)"
                        icon="pi pi-shopping-cart"
                        label="В корзине / Кончилось"
                        disabled
                      />
                      <Button
                        v-else
                        icon="pi pi-cart-arrow-down"
                        label="Купить"
                        @click="handleAddToCart(item.id)"
                        :disabled="isSomeLoading.value && item.quantity"
                        class="flex-auto md:flex-initial white-space-nowrap"
                      />
                    </div>
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
