<template>
  <ul>
    <LibraryGridItem
      v-for="(item, index) of items"
      :key="index"
      :item="item"
      :aspect-ratio="settingsStore.previewAspectRatio"
      @open:directory="onOpenDirectory"
    />
  </ul>
</template>

<script setup lang="ts">
import type DirOrFile from '@/shared/models/files';
import type { Directory } from '@/shared/models/files';
import { useSettingsStore } from '@/stores/settings';

type Props = {
  items: DirOrFile[];
}

type Emits = {
  (e: 'open:directory', directory: Directory): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const settingsStore = useSettingsStore();

function onOpenDirectory(directory: Directory) {
  emit('open:directory', directory);
}
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding-bottom: 1rem;
}
</style>