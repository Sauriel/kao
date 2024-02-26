<span class="library-view">
  <Icon icon="material-symbols:grid-on" />
  <Switch.Root
    checked={$settingsStore.gridView}
    onCheckedChange={settingsStore.setGridView}
    class="switch"
  >
    <Switch.Thumb class="switch--thumb" />
  </Switch.Root>
  <Icon icon="material-symbols:flex-wrap-rounded" />
</span>

<style>
  .library-view {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>

<script lang="ts">
  import settingsStore from '$lib/stores/settings/settingsStore';
  import Icon from '@iconify/svelte';
  import { Switch } from 'bits-ui';
</script>
