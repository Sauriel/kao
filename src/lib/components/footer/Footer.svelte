<footer>
  <section>
    <Search />
    <Sorting />
    <Filter />
  </section>
  <section>
    <LibrarySelector />
    <DesignToggle />
    <LogToggle />
  </section>
</footer>

<style>
  footer {
    grid-area: footer;
    background-color: var(--color-background--dark);
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 0 1rem;
  }

  section {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
</style>

<script lang="ts">
  import LogToggle from './LogToggle.svelte';
  import DesignToggle from './DesignToggle.svelte';
  import Sorting from './Sorting.svelte';
  import LibrarySelector from './LibrarySelector.svelte';
  import Filter from './Filter.svelte';
  import Search from './Search.svelte';
</script>
