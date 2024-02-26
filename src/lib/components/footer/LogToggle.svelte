<button onclick={settingsStore.toggleShowLog}>
  {#if $settingsStore.showLog}
    <Icon icon="material-symbols:chat-bubble-outline-rounded" />
  {:else}
    <Icon icon="material-symbols:chat-info-rounded" />
  {/if}
</button>

{#if $settingsStore.showLog}
  <Log />
{/if}

<script lang="ts">
  import settingsStore from '$lib/stores/settings/settingsStore';
  import Icon from '@iconify/svelte';
  import Log from '$lib/components/log/Log.svelte';
</script>
