<template>
  <div>
    <Grid v-if="gridView" :items="items" />
    <Flex v-else :items="items" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type DirOrFile from '../../shared/models/files';
import Flex from './library/flex.vue';
import Grid from './library/grid.vue';

const gridView = ref(true);
const items = ref<DirOrFile[]>([]);

onMounted(() => {
  window.electronAPI
    .loadDirectory()
    .then((result) => items.value = result);
})
</script>