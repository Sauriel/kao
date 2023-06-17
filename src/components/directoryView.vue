<template>
  <div>
    <header>
      <button @click="onBackClick">
        <Icon icon="mdi:chevron-left" />
      </button>
      <h2>{{ name }}</h2>
    </header>
    <section v-if="items.length > 0">
      <Grid
        v-if="$settings.gridView"
        :items="items"
        @open:directory="onDirectoryOpen"
      />
      <Flex
        v-else
        :items="items"
        @open:directory="onDirectoryOpen"
      />
    </section>
    <section v-else>
      Dieser Ordner ist leer.
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import Flex from '@components/library/flex.vue';
import Grid from '@components/library/grid.vue';
import type DirOrFile from '@shared/models/files';
import type { Directory } from '@shared/models/files';
import { settings } from '@store/settings';
import { useStore } from '@nanostores/vue';

const $settings = useStore(settings);

const items = ref<DirOrFile[]>([]);
const name = ref<string>('');

// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const path = params.get('path');
  const directoryName = params.get('name');
  if (directoryName) {
    name.value = directoryName;
  }
  if (path) {
    window.electronAPI
      .loadDirectory(path)
      .then((result) => items.value = result);
  }
})

function onDirectoryOpen(directory: Directory) {
  const directoryUrl = new URL('/directory', window.location.origin);
  directoryUrl.searchParams.set('path', directory.path);
  directoryUrl.searchParams.set('name', directory.name);
  window.location.href = directoryUrl.href;
}

function onBackClick() {
  window.history.back();
}
</script>

<style scoped>
header {
  display: grid;
  grid-template-areas: "actions header";
  grid-template-columns: auto 1fr;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

header > button {
  grid-area: actions;
}

header > h2 {
  grid-area: header;
  text-align: center;
}
</style>