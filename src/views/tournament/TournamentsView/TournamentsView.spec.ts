import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import router from '@/router'
import TournamentsView from './TournamentsView.vue'

describe('TournamentsView', () => {
  it('renders properly', async () => {
    const wrapper = mount(TournamentsView, {
      global: {
        plugins: [PrimeVue, ToastService, router, createPinia()]
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Турниры')
  })
})
