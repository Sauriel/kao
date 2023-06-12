<template>
  <div>
    <h1>Hello Vue!</h1>
    <ul>
      <li v-for="(entry, index) of result" :key="index">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const result = ref<string[]>([]);

onMounted(() => {
  window.ipcRenderer.send('loadLibrary');
  window.electronAPI.loadDirectory().then((data) => result.value = data);
})
</script>