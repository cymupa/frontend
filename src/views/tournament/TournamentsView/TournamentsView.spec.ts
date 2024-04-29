import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'

import TournamentsView from './TournamentsView.vue'
import router from '@/router'

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
