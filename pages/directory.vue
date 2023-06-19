<template>
  <div>
    <header>
      <button @click="onBackClick">
        <Icon name="mdi:chevron-left" />
      </button>
      <h2>{{ name }}</h2>
    </header>
    <Library
      v-if="path"
      :path="path"
    >
      Dieser Ordner ist leer.
    </Library>
  </div>
</template>

<script setup lang="ts">
import { useLibraryStore } from '@/stores/library';

const libraryStore = useLibraryStore();

const path = ref<string>('');
const name = ref<string>('');

onMounted(() => {
  const directoryPath = libraryStore.path;
  if (path) {
    path.value = directoryPath;
  }
  const directoryName = libraryStore.name;
  if (directoryName) {
    name.value = directoryName;
  }
})

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