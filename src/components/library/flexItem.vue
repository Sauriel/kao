<template>
  <li @click="onClick">
    <Image :image="item.cover" :unknown-type="item.type === 'unknown'" class="cover" />
    <h3>{{ item.name }}</h3>
  </li>
</template>

<script setup lang="ts">
import type DirOrFile from '@shared/models/files';
import type { Directory } from '@shared/models/files';
import Image from '@components/library/image.vue';

type Props = {
  item: DirOrFile;
  aspectRatio: number;
}

type Emits = {
  (e: 'open:directory', directory: Directory): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function onClick() {
  if (props.item.type === 'directory') {
    emit('open:directory', props.item as Directory);
  }
}
</script>

<style scoped>
li {
  flex: 0 1 auto;
  width: 200px;
  cursor: pointer;
  display: grid;
  grid-template-areas: "content";
  grid-template-columns: 100%;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: v-bind(aspectRatio);
  background-color: var(--color-warning);
  transition: var(--animation);
  border: 1px solid var(--color-background--light);
  border-radius: var(--border-radius);
  overflow: hidden;
  /* hack to keep the backdrop-filter to "fall through" */
  -webkit-filter: blur(0px);
}

li:hover {
  border-color: var(--color-font);
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
  padding: .25em .75em;
}

.cover {
  grid-area: content;
  aspect-ratio: v-bind(aspectRatio);
}
</style>