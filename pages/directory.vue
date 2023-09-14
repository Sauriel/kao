<template>
  <DirectoryView
    :name="name"
    :path="path"
    @close="onBackClick"
  />
</template>

<script setup lang="ts">
import { useLibraryStore } from '@/stores/library';

const libraryStore = useLibraryStore();

const path = computed<string>(() => libraryStore.path);
const name = computed<string>(() => libraryStore.name);

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