import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'

import TeamsView from './TeamsView.vue'

describe('TeamsView', () => {
  it('renders properly', () => {
    const wrapper = mount(TeamsView, {
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain('Команды')
  })
})
