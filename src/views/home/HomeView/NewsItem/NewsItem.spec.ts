import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'

import NewsItem from './NewsItem.vue'

describe('NewsItem', () => {
  it('renders properly', () => {
    const wrapper = mount(NewsItem, {
      props: {
        index: 0,
        news: {
          id: 1,
          title: 'Title',
          description: 'Title'
        }
      },
      global: {
        plugins
      }
    })

    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('Title')
  })
})
