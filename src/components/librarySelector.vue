<template>
  <div class="selector">
    <span>
      <strong>Ordner:</strong>
      {{ path }}
    </span>
    <button class="btn" @click="onSelectDirectoryClick">Ordner wechseln</button>
  </div>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core';

// type Props = {
//   value: string;
// }

type Emits = {
  (e: 'librarySelected', path: string): void;
}

// const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const path = computedAsync(async () => await window.electronAPI.getLibraryPath(), '');

function onSelectDirectoryClick() {
  window.electronAPI.showSelectDirectoryDialog()
    .then((path) => emit('librarySelected', path))
    .catch(e => {
      console.error(e);
    });
}
</script>

<style scoped>
.selector {
  display: inline-flex;
  gap: 1em;
  align-items: center;
}
</style>