import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import ScrollWrapper from './ScrollWrapper.vue'

describe('ScrollWrapper', () => {
  it('renders properly', () => {
    const wrapper = mount(ScrollWrapper, {
      slots: {
        default: 'Hello'
      }
    })

    expect(wrapper.text()).toContain('Hello')
  })
})
