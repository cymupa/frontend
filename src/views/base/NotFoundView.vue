<script lang="ts" setup></script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
          <span class="text-blue-500 font-bold text-3xl">404</span>
          <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>
          <div class="text-600 mb-5">Запрашиваемый ресурс не найден.</div>
          <div class="col-12 mt-5 text-center">
            <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align: center"></i>
            <router-link to="/" class="text-blue-500">На главную</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
