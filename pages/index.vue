<template>
  <div id="library">
    <Library :path="path">
      <h2>
        Es konnten keine Dateien gefunden werden. Bitte wähle einen Ordner aus.
      </h2>
      <LibrarySelector @library-selected="onLibrarySelected"/>
    </Library>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
const path = ref('');

onMounted(() => {
  ipcRenderer.invoke('getLibraryPath')
    .then(result => {
      if (result && result.trim() !== '') {
        path.value = result;
      }
    })
})

function onLibrarySelected(libraryPath: string) {
  path.value = libraryPath;
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