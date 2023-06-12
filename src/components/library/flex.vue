<template>
  <ul>
    <li v-for="(item, index) of items" :key="index">
      <img v-if="item.cover" :src="item.cover.path" :alt="item.cover.name" />
      <header>{{ item.name }}</header>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type DirOrFile from '../../../shared/models/files';

type Props = {
  items: DirOrFile[];
}

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>

<style scoped>
ul {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

li {
  flex: 0 1 auto;
  width: 20%;
}

img {
  width: 100%;
  height: auto;
}
</style>