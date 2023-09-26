<template>
  <dialog
    id="directory-view-dialog"
    ref="dialog"
    @close="onClose"
  >
    <DirectoryView
      v-if="show"
      :name="name"
      :path="path"
      @close="onClose"
    />
  </dialog>
</template>

<script setup lang="ts">
import { DirectoryViewDialogPayload } from '~/shared/models/emitter';

const { $bus } = useNuxtApp();

const dialog = ref<HTMLDialogElement>();

const show = ref<boolean>(false);
const name = ref<string>('');
const path = ref<string>('');

onMounted(() => {
  $bus.on('directory:open', (payload: DirectoryViewDialogPayload) => {
    name.value = payload.name;
    path.value = payload.path;
    show.value = payload.open;
    if (payload.open) {
      dialog.value!.show();
    }
  });
});

function onClose() {
  dialog.value!.close();
  show.value = false;
  name.value = "";
  path.value = "";
}
</script>

<style scoped>
#directory-view-dialog {
  all: unset;
  display: none;
  position: fixed;
  inset: 0;
  top: calc(2rem + 2px);
  overflow-y: auto;
  padding: calc(2 * var(--layout-gap));
  padding-top: 2rem;
  margin: 0;
  background-color: var(--color-background);
  z-index: 95;
}

#directory-view-dialog[open] {
  display: block;
}

#directory-view-dialog:deep(.back-button) {
  position: fixed;
  left: 1.5rem;
  top: 2.5rem;
  background-color: var(--color-background);
  border-radius: 50%;
  z-index: 99;
}
</style>