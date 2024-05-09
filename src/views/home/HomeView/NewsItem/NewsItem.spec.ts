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
          content: 'Content',
          photos: [''],
          name: 'Title',
          description: 'Title'
        }
      },
      global: {
        plugins
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Title')
  })
})
