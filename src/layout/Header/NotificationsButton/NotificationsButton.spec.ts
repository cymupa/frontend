import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import NotificationsButton from './NotificationsButton.vue'
import { plugins } from '@/tests/plugins'

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
