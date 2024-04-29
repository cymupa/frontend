import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import TournamentItem from './TournamentItem.vue'
import PrimeVue from 'primevue/config'

import router from '@/router'
import ToastService from 'primevue/toastservice'

describe('TournamentItem', () => {
  it('renders properly', () => {
    const wrapper = mount(TournamentItem, {
      props: {
        index: 0,
        tournament: {
          dates: '10.10.2024',
          title: 'Title',
          game: 'Dota 2',
          teamsCount: 1,
          totalPrize: 1,
          id: 1
        }
      },
      global: {
        plugins: [PrimeVue, ToastService, router, createPinia()]
      }
    })

    expect(wrapper.text()).toContain(
      '10.10.2024TitleDota 2Кол-во команд:1Призовой фонд:$1Перейти'
    )
  })
})
