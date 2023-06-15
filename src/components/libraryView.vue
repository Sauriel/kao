<template>
  <div id="library">
    <section v-if="items.length > 0">
      <Grid v-if="$settings.gridView" :items="items" />
      <Flex v-else :items="items" />
    </section>
    <section v-else id="select-directory">
      <h2>
        Es konnten keine Dateien gefunden werden. Bitte wähle einen Ordner aus.
      </h2>
      <button class="btn" @click="onSelectDirectoryClick">Ordner auswählen</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type DirOrFile from '@shared/models/files';
import Flex from '@components/library/flex.vue';
import Grid from '@components/library/grid.vue';
import { settings } from '@store/settings';
import { useStore } from '@nanostores/vue';

const $settings = useStore(settings);

const items = ref<DirOrFile[]>([]);

onMounted(() => {
  loadDirectory();
})

function loadDirectory(path?: string) {
  window.electronAPI
    .loadDirectory(path)
    .then((result) => items.value = result);
}

function onSelectDirectoryClick() {
  window.electronAPI.showSelectDirectoryDialog()
    .then(loadDirectory)
    .catch(e => {
      console.error(e);
    });
}
</script>

<style scoped>
#library,
#select-directory {
  height: 100%;
}

#select-directory {
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