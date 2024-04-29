import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import TournamentView from './TournamentView.vue'

describe('TournamentsView', () => {
  it('renders properly', () => {
    const wrapper = mount(TournamentView, {
      props: {
        id: '1'
      }
    })

    expect(wrapper.text()).toContain('tournament')
  })
})
