<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div id="global-components">
      <!-- ### -->
    </div>
  </div>
</template>

<script setup>
import { ipcRenderer } from 'electron';
import fs from 'node:fs';

onMounted(() => {
  console.log('ipcRenderer:', ipcRenderer);
  console.log('fs:', fs);
})
</script>

<style scoped>
#global-components {
  position: static;
}
</style>
