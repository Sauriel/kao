<template>
  <div>
    <h2>Settings</h2>
    <LibrarySelector />
    <div class="settings-list">
      <UiSwitch v-model="gridView">
        <template #off>
          Flex
        </template>
        <template #on>
          Grid
        </template>
      </UiSwitch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const gridView = computed({
  get: () => settingsStore.gridView,
  set: (value: boolean) => settingsStore.gridView = value
});
</script>

<style scoped>
.settings-list {
  display: flex;
  flex-direction: column;
}
</style>