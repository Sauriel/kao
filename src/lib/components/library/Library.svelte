<div id="library">
  <ul class={$settingsStore.gridView ? 'grid' : 'flex'}>
    {#each filteredEntries as entry (entry.path)}
      <LibraryItem {entry} />
    {/each}
  </ul>
</div>

<style>
  #library {
    padding-bottom: 2rem;
  }

  ul.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  ul.flex {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem 1rem 0;
  }
</style>

<script lang="ts">
  import type { LibraryEntry } from '../../stores/library/type';
  import LibraryItem from './LibraryItem.svelte';
  import settingsStore from '$lib/stores/settings/settingsStore';

  type Props = {
    entries: LibraryEntry[];
  };

  let { entries } = $props<Props>();

  let filteredEntries = $derived<LibraryEntry[]>(
    entries.filter((entry) => {
      if ($settingsStore.showOnlyImages) {
        return ['image', 'directory'].includes(entry.__type);
      }
      return true;
    })
  );
</script>
