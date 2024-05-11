import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'
import CartButton from './CartButton.vue'

describe('NotificationsButton', () => {
  it('renders properly', () => {
    const wrapper = mount(CartButton, {
      global: {
        plugins
      }
    })

    expect(wrapper.exists()).toBe(true)
  })
})
