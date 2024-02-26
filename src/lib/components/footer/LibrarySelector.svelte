<button onclick={onChangeBasePathClick}>
  <Icon icon="mdi:library-shelves" />
  {basePath}
</button>

<style>
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1ch;
    padding: 0.1em 0.5em;
    border-radius: var(--border-radius);
  }

  button:hover {
    background-color: var(--color-background--light);
  }
</style>

<script lang="ts">
  import settingsStore from '$lib/stores/settings/settingsStore';
  import Icon from '@iconify/svelte';
  import { open } from '@tauri-apps/api/dialog';

  let basePath = $derived<string>($settingsStore.basePath || 'Keine Bibliothek ausgewählt');

  function onChangeBasePathClick() {
    open({
      directory: true,
      multiple: false,
    }).then((result) => {
      if (result) {
        settingsStore.setBasePath(result as string);
      }
    });
  }
</script>
