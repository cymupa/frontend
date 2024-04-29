import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'

import TournamentItem from './TournamentItem.vue'

describe('TournamentItem', () => {
  it('renders properly', () => {
    const wrapper = mount(TournamentItem)

    expect(wrapper.text()).toContain('Новости')
  })
})
