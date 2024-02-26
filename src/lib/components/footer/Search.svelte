<input type="text" placeholder="Suchen" {oninput} />

<style>
  input {
    border: none;
    padding: 0 0.5em;
    font-size: 1em;
    border-radius: var(--border-radius);
    background-color: var(--color-background--light);
    color: var(--color-font);
  }
</style>

<script lang="ts">
  import filterStore from '$lib/stores/filter/filterStore';

  function oninput(event: any) {
    const searchTerm = ((event as InputEvent).target! as HTMLInputElement).value;
    filterStore.search(searchTerm);
  }
</script>
