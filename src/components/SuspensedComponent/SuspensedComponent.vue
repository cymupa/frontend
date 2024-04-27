<script setup lang="ts"></script>

<template>
  <Suspense>
    <slot />
    <template #fallback> Загрузка... </template>
  </Suspense>
</template>

<style scoped></style>
