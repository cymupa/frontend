import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { plugins } from '@/tests/plugins'

import FormItem from './FormItem.vue'

describe('FormItem', () => {
  it('renders properly', () => {
    const wrapper = mount(FormItem, {
      props: {
        id: 'phone',
        label: 'Телефон',
        modelValue: ''
      },
      global: {
        plugins
      }
    })

    expect(wrapper.find('label').text()).toBe('Телефон')

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits update event on input', async () => {
    const wrapper = mount(FormItem, {
      props: {
        id: 'phone',
        label: 'Телефон',
        modelValue: ''
      },
      global: {
        plugins
      }
    })

    wrapper.vm.$emit('update:modelValue', '1234567891')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1234567891'])
  })
})
