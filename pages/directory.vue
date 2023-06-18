<template>
  <div>
    <header>
      <button @click="onBackClick">
        <Icon name="mdi:chevron-left" />
      </button>
      <h2>{{ name }}</h2>
    </header>
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
    <section v-else>
      Dieser Ordner ist leer.
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

// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();

const items = ref<DirOrFile[]>([]);
const name = ref<string>('');

onMounted(() => {
  const path = libraryStore.path;
  const directoryName = libraryStore.name;
  if (directoryName) {
    name.value = directoryName;
  }
  if (path) {
    ipcRenderer.invoke('loadDirectory', path)
      .then((result) => items.value = result);
  }
})

function onDirectoryOpen(directory: Directory) {
  libraryStore.openDirectory(directory);
}

function onBackClick() {
  window.history.back();
}
</script>

<style scoped>
header {
  display: grid;
  grid-template-areas: "actions header";
  grid-template-columns: auto 1fr;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

header > button {
  grid-area: actions;
}

header > h2 {
  grid-area: header;
  text-align: center;
}
</style>