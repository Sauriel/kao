<template>
  <ul>
    <FlexItem
      v-for="(item, index) of items"
      :key="index"
      :item="item"
      :aspect-ratio="$settings.previewAspectRatio"
      @open:directory="onOpenDirectory"
    />
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type DirOrFile from '@shared/models/files';
import type { Directory } from '@shared/models/files';
import FlexItem from '@components/library/flexItem.vue';
import { settings } from '@store/settings';
import { useStore } from '@nanostores/vue';

const $settings = useStore(settings);

type Props = {
  items: DirOrFile[];
}

type Emits = {
  (e: 'open:directory', directory: Directory): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function onOpenDirectory(directory: Directory) {
  emit('open:directory', directory);
}
</script>

<style scoped>
ul {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>