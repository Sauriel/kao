<template>
  <ul>
    <li v-for="(item, index) of items" :key="index">
      <img v-if="item.cover" :src="item.cover.path" :alt="item.cover.name" loading="lazy" />
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

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

li:hover > header {
  bottom: 0;
}

img {
  grid-area: content;
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>