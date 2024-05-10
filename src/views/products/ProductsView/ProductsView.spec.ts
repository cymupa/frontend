import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'

import {plugins} from "@/tests/plugins";

import ProductsView from './ProductsView.vue'

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(ProductsView, {
      global: {
        plugins
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Список товаров')
  })
})
