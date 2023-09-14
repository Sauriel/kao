
<template>
  <div>
    <header>
      <button class="back-button" @click="emit('close')">
        <Icon name="mdi:chevron-left" />
      </button>
      <h2>{{ name }}</h2>
    </header>
    <Library
      v-if="items.length"
      :items="items"
      :has-path="hasPath"
    >
      Dieser Ordner ist leer.
    </Library>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';
import DirOrFile from '~/shared/models/files';

type Props = {
  name: string;
  path: string;
}

type Emits = {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const items = ref<DirOrFile[]>([]);

const hasPath = computed(() => !!props.path);

onMounted(() => {
  ipcRenderer.invoke('loadDirectory', props.path)
      .then((result) => items.value = result);
})
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

.back-button {
  grid-area: actions;
}

.back-button:hover {
  color: var(--color-font--dark)
}

header > h2 {
  grid-area: header;
  text-align: center;
}
</style>