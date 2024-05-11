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
          team_list: []
        }
      },
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain('NameКол-во игроков:1Перейти')
  })
})
