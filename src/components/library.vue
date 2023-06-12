<template>
  <div>
    <h1>Hello Vue!</h1>
    <ul>
      <li v-for="(folder, index) of result" :key="index">
        <img v-if="folder.cover" :src="folder.cover.path" :alt="folder.cover.name" />
        <header>{{ folder.name }}</header>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Folder } from '../models/files';

const result = ref<Folder[]>([]);

onMounted(() => {
  window.ipcRenderer.send('loadLibrary');
  window.electronAPI.loadDirectory().then((data) => result.value = data);
})
</script>

<style scoped>
  ul {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  li {
    flex: 0 1 auto;
    width: 20%;
  }

  img {
    width: 100%;
    height: auto;
  }
</style>