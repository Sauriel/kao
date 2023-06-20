<template>
  <section v-if="hasPath && items.length > 0">
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
  <section v-else-if="!hasPath" :class="$style.info">
    <slot />
  </section>
  <section v-else :class="$style.info">
    <h2>Loading ...</h2>
  </section>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { useLibraryStore } from '@/stores/library';
import type DirOrFile from '@/shared/models/files';
import type { Directory } from '@/shared/models/files';

const settingsStore = useSettingsStore();
const libraryStore = useLibraryStore();

type Props = {
  items: DirOrFile[];
  hasPath?: boolean;
}

const props = defineProps<Props>();

function onDirectoryOpen(directory: Directory) {
  libraryStore.openDirectory(directory);
}
</script>

<style module>
.info {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>