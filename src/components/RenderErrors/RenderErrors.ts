import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import RenderErrors from './RenderErrors.vue'

describe('ScrollWrapper', () => {
  it('renders properly', () => {
    const wrapper = mount(RenderErrors, {
      slots: {
        default: 'Hello'
      }
    })

    expect(wrapper.text()).toContain('Hello')
  })
})
