<template>
  <li @click="onClick">
    <Image
      :image="image"
      :unknown-type="item.type === 'unknown'"
      class="cover"
    />
    <h3>{{ item.name }}</h3>
  </li>
</template>

<script setup lang="ts">
import type DirOrFile from '@shared/models/files';
import type { Directory, File } from '@shared/models/files';
import Image from '@components/library/image.vue';
import { computed } from 'vue';

type Props = {
  item: DirOrFile;
  aspectRatio: number;
}

type Emits = {
  (e: 'open:directory', directory: Directory): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const image = computed<File | undefined>(() => {
  if (props.item.type === 'directory') {
    return (props.item as Directory).cover;
  } else if (props.item.type === 'image') {
    return props.item;
  }
  return undefined;
});

function onClick() {
  if (props.item.type === 'directory') {
    emit('open:directory', props.item as Directory);
  } else {
    window.electronAPI.showFileInOS(props.item.path);
  }
}
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

h3 {
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
  padding: .25em .75em;
}

li:hover > h3 {
  bottom: 0;
}

.cover {
  grid-area: content;
  aspect-ratio: v-bind(aspectRatio);
}
</style>