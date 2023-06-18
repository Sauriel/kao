<template>
  <div id="library">
    <section v-if="items.length > 0">
      <LibraryGrid
        v-if="settingsStore.gridView"
        :items="items"
        @open:directory="onDirectoryOpen"
      />
      <LibraryFlex
        v-else
        :items="items"
        @open:directory="onDirectoryOpen"
      />
    </section>
    <section v-else-if="!noLibrarySelected" id="info">
      <h2>Loading ...</h2>
    </section>
    <section v-else id="info">
      <h2>
        Es konnten keine Dateien gefunden werden. Bitte wähle einen Ordner aus.
      </h2>
      <LibrarySelector @library-selected="loadDirectory"/>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import { useSettingsStore } from '@/stores/settings';
import { useLibraryStore } from '@/stores/library';
import type DirOrFile from '@/shared/models/files';
import type { Directory } from '@/shared/models/files';

const settingsStore = useSettingsStore();
const libraryStore = useLibraryStore();

const items = ref<DirOrFile[]>([]);
const noLibrarySelected = ref(false);

onMounted(() => {
  ipcRenderer.invoke('getLibraryPath')
    .then(path => {
      if (path && path.trim() !== '') {
        loadDirectory();
      } else {
        noLibrarySelected.value = true;
      }
    })
})

function loadDirectory() {
  ipcRenderer.invoke('loadDirectory')
    .then((result) => items.value = result);
}

function onDirectoryOpen(directory: Directory) {
  libraryStore.openDirectory(directory);
}
</script>

<style scoped>
#library,
#info {
  height: 100%;
}

#info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

h2 {
  font-size: 2rem;
  text-align: center;
}
</style>