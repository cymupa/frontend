import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'

import ProductsView from './ProductsView.vue'

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(ProductsView)

    expect(wrapper.exists()).toBe(true)
    // expect(wrapper.text()).toContain('Новости')
  })
})
