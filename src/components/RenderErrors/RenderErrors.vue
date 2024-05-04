<script setup lang="ts">
interface Props {
  values?: Array<string>
}

const { values } = defineProps<Props>()
console.log('values', values)
</script>

<template>
  <ul>
    <li v-for="value in values">
      <InlineMessage> {{ value }}</InlineMessage>

    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 10px 0;
  list-style-type: none;
}
</style>
