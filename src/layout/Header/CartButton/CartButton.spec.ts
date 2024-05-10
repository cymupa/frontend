import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import CartButton from './CartButton.vue'
import { plugins } from '@/tests/plugins'

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
