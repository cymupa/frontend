<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

import { cartApi } from '@/api/requests'
import { STORAGE_URL } from '@/config/env'
import { useCartStore } from '@/stores/cart'

import MainTitle from '@/components/MainTitle/MainTitle.vue'

const { state } = storeToRefs(useCartStore())
const { setCart, getActualCart, setCartItem } = useCartStore()

const cartId = ref('1')

const { data, fetchData, isLoading, error } = cartApi.getAll()

const {
  data: minusData,
  fetchData: fetchMinus,
  isLoading: isMinusLoading,
  error: minusError
} = cartApi.minusFromCart()

const {
  data: plusData,
  fetchData: fetchPlus,
  isLoading: isPlusLoading,
  error: plusError
} = cartApi.plusToCart()

onMounted(async () => {
  if (!state.value.data.length) {
    await fetchData()

    if (!data?.value) {
      return
    }

    setCart(data.value)
  }
})

const handleAddToCart = async (id: number) => {
  try {
    await fetchPlus(undefined, id)

    if (!plusData.value) {
      return
    }

    const { product } = plusData.value

    setCartItem({
      photo: product.photo,
      name: product.name,
      price: product.price,
      ...plusData.value
    })
  } catch {
    console.log(1)
  }
}

const handleMinusFromCart = async (id: number) => {
  try {
    await fetchMinus(undefined, id)
    setCartItem(minusData.value)
  } catch {
    console.log(1)
  }
}

const isSomeLoading = computed(
  () => isPlusLoading.value || isMinusLoading.value
)

const isVisible = ref()

const toggle = (event: MouseEvent) => {
  isVisible.value.toggle(event)
}
</script>

<template>
  <div class="card">
    <MainTitle bold>Корзина</MainTitle>

    <div class="flex justify-content-center">
      <ProgressSpinner v-if="isLoading" />
      <Message severity="error" :closable="false" v-else-if="error">Ошибка</Message>
      <Message v-else-if="!data?.length && !state.data.length" :closable="false">Корзина пустая</Message>
    </div>

    <DataView v-if="Boolean(state.data?.length)" :value="state.data" data-key="id">
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
                </div>

                <div class="flex flex-column md:align-items-end gap-5">
                  <span class="text-xl font-semibold text-900">{{ item.price }} Р.</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2 align-items-center">
                    <Button
                      :disabled="isSomeLoading"
                      @click="item.quantity === 1 ? toggle : handleMinusFromCart(item.id)"
                      icon="pi pi-cart-minus"
                      severity="danger"
                      aria-label="Minus"
                      outlined
                    />

                    <OverlayPanel ref="isVisible">
                      <div class="flex flex-column gap-3 w-20rem">
                        <div>
                          <span class="font-medium text-900 block">{{ 'Приглашения в команду' }}</span>
                        </div>
                      </div>
                    </OverlayPanel>

                    <Tag>{{ item.quantity }}</Tag>

                    <Button
                      :disabled="isSomeLoading"
                      @click="handleAddToCart(item.id)"
                      icon="pi pi-cart-plus"
                      aria-label="Plus"
                      outlined
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
</template>
