<template>
  <img
    v-if="image"
    :src="image.path"
    :alt="image.name"
    loading="lazy"
  />
  <div v-else class="placeholder">
    {{ unknownType ? '?' : 'Kein Cover' }}
  </div>
</template>

<script setup lang="ts">
import type { File } from '../../../shared/models/files';

type Props = {
  image?: File;
  unknownType?: boolean;
}

// type Emits = {
//   (e: 'update', payload: string): void;
// }

const props = defineProps<Props>();
// const emit = defineEmits<Emits>();
</script>

<style scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  text-transform: uppercase;
}

img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>