<button onclick={settingsStore.toggleShowOnlyImages}>
  {#if $settingsStore.showOnlyImages}
    <Icon icon="material-symbols:image-outline-rounded" />
  {:else}
    <Icon icon="material-symbols:hide-image-outline-rounded" />
  {/if}
</button>

<script lang="ts">
  import settingsStore from '$lib/stores/settings/settingsStore';
  import Icon from '@iconify/svelte';
</script>
