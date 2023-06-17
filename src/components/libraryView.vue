<template>
  <div id="library">
    <section v-if="items.length > 0">
      <Grid v-if="$settings.gridView" :items="items" />
      <Flex v-else :items="items" />
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
import { ref, onMounted } from 'vue';
import type DirOrFile from '@shared/models/files';
import Flex from '@components/library/flex.vue';
import Grid from '@components/library/grid.vue';
import LibrarySelector from '@components/librarySelector.vue';
import { settings } from '@store/settings';
import { useStore } from '@nanostores/vue';

const $settings = useStore(settings);

const items = ref<DirOrFile[]>([]);
const noLibrarySelected = ref(false);

onMounted(() => {
  window.electronAPI.getLibraryPath().then(path => {
    if (path && path.trim() !== '') {
      loadDirectory();
    } else {
      noLibrarySelected.value = true;
    }
  })
})

function loadDirectory() {
  window.electronAPI
    .loadDirectory()
    .then((result) => items.value = result);
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