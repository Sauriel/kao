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
import { ipcRenderer } from 'electron';
import { computedAsync } from '@vueuse/core';

// type Props = {
//   value: string;
// }

type Emits = {
  (e: 'librarySelected', path: string): void;
}

// const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const path = ref<string>('');

onMounted(() => {
  ipcRenderer.invoke('getLibraryPath')
    .then(result => path.value = result)
    .catch(e => {
      console.error(e);
    });
})

function onSelectDirectoryClick() {
  ipcRenderer.invoke('dialog:selectDirectory')
    .then((result) => {
      path.value = result;
      emit('librarySelected', result);
    })
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