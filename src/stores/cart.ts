import { cartApi } from '@/api/requests'
import type { CartProduct } from '@/api/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface CartItem {
  id: number
  quantity: number
  product_id?: number
}

export const useCartStore = defineStore('cart', () => {
  const state = reactive<{ data: CartItem[] }>({
    data: []
  })

  const setCart = (data: CartItem[]) => (state.data = data)

  const addToCart = (id: number) => {
    const existingItem = state.data.find((item) => item.id === id)

    if (existingItem) {
      existingItem.quantity++
      return
    }

    state.data.push({ id, quantity: 1 })
  }

  const setCartItem = (item: CartItem): CartProduct => {
    const index = state.data.findIndex(
      (existingItem) => existingItem.id === item.id
    )

    console.log('item', item)

    if (index !== -1) {
      state.data[index] = item
      return
    }

    state.data.push(item)
  }

  const removeFromCart = (id: number) => {
    const index = state.data.findIndex((item) => item.id === id)

    if (index === -1) {
      return
    }

    const item = state.data[index]
    if (item.quantity > 1) {
      item.quantity--
      return
    }

    state.data.splice(index, 1)
  }

  const isItemExists = (id: number) => {
    return state.data.findIndex((item) => item?.product_id === id) !== -1
  }

  const getActualCart = async () => {
    const { data, fetchData, isLoading, error } = cartApi.getAll()

    await fetchData()

    if (!data?.value) {
      return
    }

    setCart(data.value)
  }

  return {
    state,
    addToCart,
    removeFromCart,
    isItemExists,
    getActualCart,
    setCartItem,
    setCart
  }
})
