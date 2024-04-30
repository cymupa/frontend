import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'

import TeamItem from './TeamItem.vue'

describe('TeamItem', () => {
  it('renders properly', () => {
    const wrapper = mount(TeamItem, {
      props: {
        index: 0,
        team: {
          id: 1,
          name: 'Name',
          players_count: 1,
          reward: 100,
          game: 'Dota 2',
          date: '10.20.2024'
        }
      },
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain(
      'Name10.20.2024Dota 2Кол-во игроков:1Суммарный выигрышь:$100Перейти'
    )
  })
})
