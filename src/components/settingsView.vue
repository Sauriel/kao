<template>
  <div>
    <h2>Settings</h2>
    <Switch v-model="gridView">
      <template #off>
        Flex
      </template>
      <template #on>
        Grid
      </template>
    </Switch>
  </div>
</template>

<script setup lang="ts">
import Switch from '@components/ui/switch.vue';
import { computed, ref } from 'vue';
import { settings } from '@store/settings';
import { useStore } from '@nanostores/vue';

const $settings = useStore(settings);

// type Props = {
//   value: string;
// }

// type Emits = {
//   (e: 'update', payload: string): void;
// }

// const props = defineProps<Props>();
// const emit = defineEmits<Emits>();

const test = ref(false);

const gridView = computed({
  get: () => $settings.value.gridView,
  set: (value: boolean) => {
    console.log(`set to ${value}`);
  }
});
</script>