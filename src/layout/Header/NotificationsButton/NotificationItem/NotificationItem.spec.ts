import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { describe, expect, it } from 'vitest'

import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import router from '@/router'
import NotificationItem from './NotificationItem.vue'

const wrapper = mount(NotificationItem, {
  global: {
    plugins: [PrimeVue, ToastService, router, ConfirmationService]
  },
  props: {
    index: 0,
    member: {
      name: 'Name',
      team_name: 'Test Team'
    }
  }
})
describe('NotificationItem', () => {
  it('renders properly', () => {
    // const wrapper = mount(NotificationItem, {
    //   props: {
    //     index: 0,
    //     member: {
    //       name: 'Name',
    //       team_name: 'Test Team'
    //     }
    //   }
    // })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Test Team')
  })
})
