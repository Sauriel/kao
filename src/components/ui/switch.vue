<template>
  <label>
    <slot name="off" />
    <input
      type="checkbox"
      v-model="data"
    />
    <slot name="on" />
  </label>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

type Props = {
  modelValue: boolean;
}

type Emits = {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const data = useVModel(props, 'modelValue', emit);
</script>