<template>
  <ul>
    <GridItem
      v-for="(item, index) of items"
      :key="index"
      :item="item"
      :aspect-ratio="aspectRatio"
      @open:directory="onOpenDirectory"
    />
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type DirOrFile from '@shared/models/files';
import type { Directory } from '@shared/models/files';
import GridItem from '@components/library/gridItem.vue';

type Props = {
  items: DirOrFile[];
}

type Emits = {
  (e: 'open:directory', directory: Directory): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const aspectRatio = ref(3 / 4);

function onOpenDirectory(directory: Directory) {
  console.log(`open ${directory.path}`);
}
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
</style>