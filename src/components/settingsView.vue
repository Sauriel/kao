<template>
  <div>
    <h2>Settings</h2>
    <LibrarySelector />
    <div class="settings-list">
      <Switch v-model="gridView">
        <template #off>
          Flex
        </template>
        <template #on>
          Grid
        </template>
      </Switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { settings, setSettingsValue } from '@store/settings';
import { useStore } from '@nanostores/vue';
import Switch from '@components/ui/switch.vue';
import LibrarySelector from '@components/librarySelector.vue';

const $settings = useStore(settings);

// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();

const gridView = computed({
  get: () => $settings.value.gridView,
  set: (value: boolean) => setSettingsValue('gridView', value)
});
</script>

<style>
.settings-list {
  display: flex;
  flex-direction: column;
}
</style>