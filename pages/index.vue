<template>
  <div id="library">
    <Library
      :items="items"
      :has-path="hasPath"
    >
      <h2>
        Es konnten keine Dateien gefunden werden. Bitte wähle einen Ordner aus.
      </h2>
      <LibrarySelector @library-selected="onLibrarySelected"/>
    </Library>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { useFilterStore } from '@/stores/filter';
import DirOrFile from '~/shared/models/files';

const filterStore = useFilterStore();

const items = ref<DirOrFile[]>([]);
const hasPath = ref(true);

onMounted(() => {
  ipcRenderer.invoke('getLibraryPath')
    .then(path => {
      if (path && path.trim() !== '') {
        loadLibrary(path);
      } else {
        hasPath.value = false;
      }
    })
})

function loadLibrary(path?: string) {
  ipcRenderer.invoke('loadDirectory', path)
    .then((result: DirOrFile[]) => items.value = result);
}

filterStore.$subscribe((mutation, state) => {
  const searchTerm = state.searchTerm;
  if (searchTerm.trim() === '') {
    loadLibrary();
  } else {
    ipcRenderer.invoke('searchDirectory', state.searchTerm)
      .then((result: DirOrFile[]) => items.value = result);
  }
})

function onLibrarySelected(path: string) {
  loadLibrary(path);
}
</script>

<style>
#library {
  min-height: 100%;
}



h2 {
  font-size: 2rem;
  text-align: center;
}
</style>