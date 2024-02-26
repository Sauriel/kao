<li
  class={$settingsStore.gridView ? 'grid' : 'flex'}
  use:customProperties={{ '--aspectRatio': $settingsStore.aspectRatio }}
>
  <AspectRatio.Root ratio={$settingsStore.aspectRatio}>
    <button {onclick}>
      <header>{entry.name}</header>
      <LibraryImage {entry} />
    </button>
  </AspectRatio.Root>
</li>

{#if isDirectory && showDialog}
  <Dialog.Root bind:open={showDialog}>
    <Dialog.Portal>
      <Dialog.Overlay class="dialog--overlay" />
      <Dialog.Content class="dialog">
        <section class="directory">
          <aside>
            <header>
              {entry.name}
            </header>
            {#if info}
              <dl>
                {#each [...info] as [key, value]}
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                {/each}
              </dl>
            {/if}
            <button onclick={openDirectory}>Ordner öffnen</button>
          </aside>
          <div class="library">
            <Library entries={children.sort(LIBRARY_SORT.nameASC)} />
          </div>
        </section>
        <footer>
          <Dialog.Close class="dialog--close">Ordner Schließen</Dialog.Close>
        </footer>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
{/if}

<style>
  /* Grid */
  li.grid {
    transform-origin: center;
    transition: var(--animation);
    background-color: var(--color-warning);
    cursor: pointer;
  }

  li.grid:hover {
    scale: 1.2;
    box-shadow: 4px 4px 8px var(--color-background--dark);
    z-index: 90;
  }

  li.grid button {
    width: 100%;
    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: var(--aspectRatio);
  }

  li.grid header {
    grid-area: content;
    color: var(--color-background);
    width: 100%;
    font-weight: bold;
    font-size: 1.2em;
    background-color: var(--blur-color);
    backdrop-filter: var(--blur);
    text-align: center;
    position: relative;
    bottom: -100%;
    transition: var(--animation);
    padding: 0.25em 0.75em;
  }

  li.grid:hover header {
    bottom: 0;
  }

  /* Flex */

  li.flex {
    flex: 0 1 auto;
    width: 200px;
  }

  li.flex button {
    width: 100%;
    cursor: pointer;
    display: grid;
    grid-template-areas: 'content';
    grid-template-columns: 100%;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: var(--aspectRatio);
    background-color: var(--color-warning);
    transition: var(--animation);
    border: 1px solid var(--color-background--light);
    border-radius: var(--border-radius);
    overflow: hidden;
    /* hack to keep the backdrop-filter to "fall through" */
    -webkit-filter: blur(0px);
  }

  li.flex:hover button {
    border-color: var(--color-font);
  }

  li.flex header {
    grid-area: content;
    color: var(--color-background);
    width: 100%;
    font-weight: bold;
    font-size: 1.2em;
    background-color: var(--blur-color);
    backdrop-filter: var(--blur);
    text-align: center;
    padding: 0.25em 0.75em;
  }

  .directory {
    grid-area: content;
    display: grid;
    grid-template-columns: 15vw 1fr;
    grid-template-rows: minmax(0, 1fr);
    grid-template-areas: 'aside content';
  }

  .directory aside {
    grid-area: aside;
    padding: 1em;
    background-color: var(--color-background--light);
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header'
      'content'
      'footer';
  }

  .directory aside header {
    grid-area: header;
    font-size: 2em;
    font-weight: bold;
  }

  .directory aside dl {
    grid-area: content;
    align-self: start;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;
  }

  .directory aside dt {
    font-weight: bold;
  }

  .directory aside button {
    grid-area: footer;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-font);
    padding: 0.5em 1em;
  }

  .directory aside button:hover {
    background-color: var(--color-background);
  }

  .directory .library {
    grid-area: content;
    overflow-y: auto;
  }

  footer {
    grid-area: footer;
    display: grid;
    padding: 0.25rem;
    background-color: var(--color-background--light);
  }
</style>

<script lang="ts">
  import { AspectRatio, Dialog } from 'bits-ui';
  import type { Directory, LibraryEntry } from '$lib/stores/library/type';
  import LibraryImage from './LibraryImage.svelte';
  import { customProperties } from '$lib/action/customProperty';
  import settingsStore from '$lib/stores/settings/settingsStore';
  import Library from './Library.svelte';
  import { LIBRARY_SORT } from '$lib/stores/library/constants';
  import { open } from '@tauri-apps/api/shell';
  import filterStore from '$lib/stores/filter/filterStore';

  type Props = {
    entry: LibraryEntry;
  };

  let { entry } = $props<Props>();
  let showDialog = $state<boolean>(false);
  let info = $state<Map<string, string> | null>(null);
  let isDirectory = $derived<boolean>(entry.__type === 'directory');
  let children = $derived<LibraryEntry[]>((entry as Directory).content);

  function onclick() {
    if (isDirectory) {
      info = filterStore.getInfo(entry.path) || null;
      showDialog = true;
    }
  }

  function openDirectory() {
    open(entry.path);
  }
</script>
