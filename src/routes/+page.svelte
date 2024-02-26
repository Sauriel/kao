{#if loading}
  <div class="info">Lade Bibliothek...</div>
{:else if $libraryStore}
  <Library entries={sortedEntries} />
{:else}
  <div class="info">Keine Bibliothek gefunden. Bitte wähle eine aus.</div>
{/if}

<style>
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 4rem;
    font-weight: bold;
  }
</style>

<script lang="ts">
  import libraryStore from '../lib/stores/library/libraryStore';
  import Library from '$lib/components/library/Library.svelte';
  import type { LibraryEntry } from '$lib/stores/library/type';
  import settingsStore from '$lib/stores/settings/settingsStore';
  import { LIBRARY_SORT } from '$lib/stores/library/constants';
  import filterStore from '$lib/stores/filter/filterStore';

  let loading = $state<boolean>(false);

  let sortedEntries = $derived.by<LibraryEntry[]>(() => {
    const entries = $libraryStore?.content ?? [];
    const filterResult = $filterStore;
    let filteredEntries = entries;
    if (filterResult.length > 0) {
      filteredEntries = filteredEntries.filter((entry) => filterResult.includes(entry.path));
    }
    const sortBy = $settingsStore.sortBy;
    const sortedEntries = filteredEntries.toSorted(LIBRARY_SORT[sortBy]);
    return sortedEntries;
  });

  $effect(() => {
    const directory = $settingsStore.basePath;
    if (directory && $settingsStore.basePath !== $libraryStore?.path) {
      loading = true;
      libraryStore
        .load(directory)
        .then(() => (loading = false))
        .catch(() => {
          loading = false;
          console.error('Failed to load library');
        });
    }
  });
</script>
