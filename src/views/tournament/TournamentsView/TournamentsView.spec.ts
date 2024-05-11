import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'

import TournamentsView from './TournamentsView.vue'

describe('TournamentsView', () => {
  it('renders properly', async () => {
    const wrapper = mount(TournamentsView, {
      global: {
        plugins
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Турниры')
  })
})
