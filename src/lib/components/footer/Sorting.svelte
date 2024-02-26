<Select.Root
  items={sortModes}
  selected={selectedSortMode}
  onSelectedChange={onSelectedSortModeChanged}
  required
>
  <Select.Trigger class="select--trigger">
    <Select.Value />
    <Icon icon="ph:caret-up-down-bold" />
  </Select.Trigger>
  <Select.Content class="select--content">
    {#each sortModes as mode (mode.value)}
      <Select.Item value={mode.value} label={mode.label} class="select--item">
        <span class="icon-text">
          {mode.shortName}
          <Icon icon={mode.icon} />
        </span>
        <!-- {mode.label} -->
        <Select.ItemIndicator>
          <Icon icon="material-symbols:check-small-rounded" />
        </Select.ItemIndicator>
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>

<style>
  .icon-text {
    display: flex;
    align-items: center;
    gap: 1ch;
    font-weight: 600;
  }
</style>

<script lang="ts">
  import settingsStore from '$lib/stores/settings/settingsStore';
  import Icon from '@iconify/svelte';
  import { Select, type Selected } from 'bits-ui';
  import type { SortBy } from '$lib/stores/settings/type';

  type SelectedSortMode = Selected<SortBy> & { shortName: string; icon: string };

  const sortModes: SelectedSortMode[] = [
    { value: 'nameASC', label: 'Name (A → Z)', shortName: 'Name', icon: 'ri:sort-alphabet-asc' },
    { value: 'nameDESC', label: 'Name (Z → A)', shortName: 'Name', icon: 'ri:sort-alphabet-desc' },
    // { value: 'missingCoverASC', label: 'Fehlender Avatar (fehlende zuerst)', icon: '' },
    // { value: 'missingCoverDESC', label: 'Fehlender Avatar (fehlende zuletzt)', icon: '' },
    // { value: 'contentLengthASC', label: 'Anzahl Bilder (aufsteigend)', icon: '' },
    // { value: 'contentLengthDESC', label: 'Anzahl Bilder (absteigend)', icon: '' },
  ];

  let selectedSortMode = $derived<Selected<SortBy> | undefined>(
    sortModes.find((mode) => mode.value === $settingsStore.sortBy)
  );

  function onSelectedSortModeChanged(selected: Selected<SortBy> | undefined) {
    if (selected) {
      settingsStore.setSortBy(selected.value);
    }
  }
</script>
