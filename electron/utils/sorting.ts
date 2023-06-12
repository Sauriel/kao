import type { Dirent } from 'fs';

function sortAlpha(a: Dirent, b: Dirent): number {
  return a.name.localeCompare(b.name);
}

export {
  sortAlpha
}