import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'

import { plugins } from '@/tests/plugins'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain('Новости')
  })
})
