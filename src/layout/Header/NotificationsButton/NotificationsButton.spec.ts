import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'
import NotificationsButton from './NotificationsButton.vue'

describe('NotificationsButton', () => {
  it('renders properly', () => {
    const wrapper = mount(NotificationsButton, {
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain('Уведомления')
  })
})
