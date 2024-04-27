import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import SuspensedComponent from './SuspensedComponent.vue'

describe('SuspensedComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(SuspensedComponent, {
      slots: {
        default: 'Hello'
      }
    })

    expect(wrapper.text()).toContain('Hello')
  })
})
