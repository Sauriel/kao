<template>
  <label>
    <slot name="off" />
    <span class="switch">
      <input
      type="checkbox"
      v-model="data"
      />
    </span>
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

<style scoped>
label {
  display: inline-grid;
  grid-template-areas: "off icon on";
  grid-template-columns: 1fr auto 1fr;
  gap: .5em;
  align-items: center;
  user-select: none;
}

label:first-child {
  grid-area: off;
  justify-self: flex-end;
}

label:last-child {
  grid-area: on;
  justify-self: flex-start;
}

.switch {
  --switch-height: 1.2em;
  --switch-width: 2.2em;
  grid-area: icon;
  justify-self: center;
  display: inline-block;
  border: 1px solid var(--color-font);
  height: var(--switch-height);
  width: var(--switch-width);
  border-radius: 100000px;
  position: relative;
  cursor: pointer;
}

.switch::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  height: calc(var(--switch-height) - 6px);
  width: calc(var(--switch-height) - 6px);
  background-color: var(--color-font);
  border-radius: 50%;
  transition: var(--animation);

}

.switch:has(input:checked)::before {
  left: calc(var(--switch-width) - (var(--switch-height) - 6px) - 4px);
}
</style>