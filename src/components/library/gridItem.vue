<template>
  <li>
    <Image
      :image="item.cover"
      :unknown-type="item.type === 'unknown'"
      class="cover"
    />
    <header>{{ item.name }}</header>
  </li>
</template>

<script setup lang="ts">
import type DirOrFile from '../../../shared/models/files';
import Image from './image.vue';

type Props = {
  item: DirOrFile;
  aspectRatio: number;
}

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>

<style scoped>
li {
  transform-origin: center;
  transition: var(--animation);
  background-color: var(--color-warning);
  cursor: pointer;
  display: grid;
  grid-template-areas: "content";
  grid-template-columns: 100%;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: v-bind(aspectRatio);
}

li:hover {
  scale: 1.2;
  box-shadow: 4px 4px 8px var(--color-background--dark);
  z-index: 99;
}

header {
  grid-area: content;
  color: var(--color-background);
  width: 100%;
  font-weight: bold;
  font-size: 1.2em;
  background-color: var(--blur-color);
  backdrop-filter: var(--blur);
  text-align: center;
  position: relative;
  bottom: -100%;
  transition: var(--animation);
}

li:hover>header {
  bottom: 0;
}

.cover {
  grid-area: content;
}
</style>