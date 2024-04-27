import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import SmallText from './MainTitle.vue'

describe('SmallText', () => {
  it('renders properly', () => {
    const wrapper = mount(SmallText, {
      slots: {
        default: 'Hello'
      }
    })

    expect(wrapper.text()).toContain('Hello')
  })
})
