import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'

import TournamentsView from './TournamentsView.vue'

describe('TournamentsView', () => {
  it('renders properly', () => {
    const wrapper = mount(TournamentsView)

    expect(wrapper.text()).toContain('Новости')
  })
})
