<script setup></script>

<template>
  <div class="wrapper card">
    <ScrollPanel
      class="scroll-wrapper pb-7"
      :pt="{
        wrapper: {
          style: { 'border-right': '10px solid var(--surface-ground)', 'padding-right': '20px' },
        },
        bary: 'hover:bg-primary-400 bg-primary-300 opacity-100',
      }"
    >
      <slot />
    </ScrollPanel>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 84.8vh;
  overflow: hidden;
  padding-bottom: 300px;
}

.scroll-wrapper {
  height: 85vh;
  width: 100%;
}
</style>
