<ul id="log">
  {#each $logStore as message (message.timestamp)}
    <LogEntry {message} />
  {/each}
</ul>

<style>
  #log {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding: 1rem;
    margin: 0;
    position: fixed;
    bottom: 2rem;
    left: 0;
    right: 0;
    max-height: 25vh;
    overflow-y: auto;
    background-color: color-mix(in srgb, var(--color-background--dark) 75%, transparent);
    backdrop-filter: blur(2px);
    color: white;
  }
</style>

<script lang="ts">
  import logStore from '../../stores/log/logStore';
  import LogEntry from './LogEntry.svelte';
</script>
