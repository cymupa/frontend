import { cartApi } from '@/api/requests'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface CartItem {
  quantity: number
  id: number
}

export const useCartStore = defineStore('cart', () => {
  const state = reactive<{ data: CartItem[] }>({
    data: []
  })

  const addToCart = (id: number) => {
    const existingItem = state.data.find((item) => item.id === id)
    if (existingItem) {
      existingItem.quantity++
      return
    }

    state.data.push({ id, quantity: 1 })
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

  const isItemExists = (id: number) =>
    state.data.findIndex((item) => item.id === id) !== -1

  const getActualCart = async () => {
    const { data, fetchData, isLoading, error } = cartApi.getAll()

    try {
      await fetchData()

      if (!data?.value) {
        return
      }

      return { data, fetchData, isLoading, error }
    } catch (e) {
      console.warn('Error at store: ', e)
    }
  }

  return { state, addToCart, removeFromCart, isItemExists, getActualCart }
})
