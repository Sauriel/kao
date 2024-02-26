import type { Directory, Image } from '$lib/stores/library/type';

export function findCover(entry: Directory): Image | undefined {
  return entry.content.find((file) => file.__type === 'image' && file.name.startsWith('0.')) as
    | Image
    | undefined;
}
