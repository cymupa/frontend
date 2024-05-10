import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import MainTitle from './MainTitle.vue'

describe('MainTitle', () => {
  it('renders properly', () => {
    const wrapper = mount(MainTitle, {
      slots: {
        default: 'Hello'
      }
    })

    expect(wrapper.text()).toContain('Hello')
  })
})
