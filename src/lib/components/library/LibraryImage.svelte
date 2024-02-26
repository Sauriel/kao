{#if image}
  <img loading="lazy" class="image" src={image} alt={entry.name} />
{:else}
  <div class="placeholder">
    {unknownType ? '?' : 'Kein Bild'}
  </div>
{/if}

<style>
  .placeholder {
    grid-area: content;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: var(--color-primary);
    font-weight: bold;
    font-size: 2em;
    text-align: center;
    text-transform: uppercase;
    aspect-ratio: var(--aspectRatio);
  }

  .image {
    grid-area: content;
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: var(--aspectRatio);
  }
</style>

<script lang="ts">
  import { findCover } from '$lib/utils/file';
  import type { LibraryEntry } from '../../stores/library/type';

  type Props = {
    entry: LibraryEntry;
  };

  let { entry } = $props<Props>();

  let image = $derived.by<string | undefined>(() => {
    if (entry.__type === 'directory') {
      const coverImage = findCover(entry);
      if (coverImage) {
        return coverImage.src;
      }
    } else if (entry.__type === 'image') {
      return entry.src;
    }
    return undefined;
  });

  let unknownType = $derived<boolean>(entry.__type === 'unknown' || entry.__type === 'info');
</script>
