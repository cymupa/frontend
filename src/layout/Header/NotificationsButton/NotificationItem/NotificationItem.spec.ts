import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import NotificationItem from './NotificationItem.vue'

describe('NotificationItem', () => {
  it('renders properly', () => {
    const wrapper = mount(NotificationItem, {
      props: {
        index: 0,
        member: {
          name: 'Name',
          team_name: 'Test Team'
        }
      }
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Test Team')
  })
})
