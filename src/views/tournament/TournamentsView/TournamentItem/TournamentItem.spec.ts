import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import TournamentItem from './TournamentItem.vue'

import {plugins} from "@/tests/plugins";

describe('TournamentItem', () => {
  it('renders properly', () => {
    const wrapper = mount(TournamentItem, {
      props: {
        index: 0,
        tournament: {

          id: 1
        }
      },
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain(
      'contrastВзнос:$ Р.Перейти'
    )
  })
})
