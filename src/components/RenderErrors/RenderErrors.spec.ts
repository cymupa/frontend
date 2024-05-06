import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import RenderErrors from './RenderErrors.vue'

describe('RenderErrors', () => {
  it('renders properly when values prop is provided', () => {
    const values = ['Value 1', 'Value 2', 'Value 3']

    const wrapper = mount(RenderErrors, {
      props: {
        values
      }
    })

    expect(wrapper.exists()).toBe(true)
    values.forEach((value) => {
      expect(wrapper.text()).toContain(value)
    })
  })

  it('renders properly when no values prop is provided', () => {
    const wrapper = mount(RenderErrors)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Value')
  })
})
