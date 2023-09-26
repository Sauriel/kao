<template>
  <div class="search-wrapper">
    <input type="text" class="search-input" placeholder="Suche ..." @input="onSearchInput" />
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();

let timeout: number | NodeJS.Timeout | null = null;

function onSearchInput(event: InputEvent) {
  const value = (event.target as HTMLInputElement).value;
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    filterStore.$patch({ searchTerm: value });
  }, 1000);
}
</script>

<style>
.search-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input {
  flex-grow: 1;
  border: 1px solid var(--color-font--dark);
  background-color: var(--color-background--light);
  color: var(--color-font);
  border-radius: 100px;
  padding:0 .75em;
}

.search-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
}
</style>