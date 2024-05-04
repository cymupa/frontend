import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import NotificationsButton from './NotificationsButton.vue'

describe('NotificationsButton', () => {
  it('renders properly', () => {
    const wrapper = mount(NotificationsButton, {})

    expect(wrapper.text()).toContain('Уведомления')
  })
})
