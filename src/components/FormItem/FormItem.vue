<script setup lang="ts">
interface Props {
  id: string
  label: string
  placeholder?: string
  modelValue: string
  type?: 'text' | 'password'
  full?: boolean
  invalid?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="{ 'w-full': full }">
    <label :for="id" class="block text-900 text-xl font-medium mb-2">{{ label }}</label>

    <InputText
      :invalid="invalid"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="mb-1 p-3"
      :value="modelValue"
      :class="{ 'w-full': full }"
      @input="$emit('update:modelValue', $event.target?.value)"
    />

    <slot />
  </div>
</template>

<style scoped></style>
