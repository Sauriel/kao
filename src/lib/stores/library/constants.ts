import { findCover } from '$lib/utils/file';
import type { SortBy } from '../settings/type';
import type { LibraryEntry } from './type';

export const IMAGE_TYPES = ['jpg', 'png'];
export const INFO_TYPE = 'txt';

export const LIBRARY_SORT: Record<SortBy, (a: LibraryEntry, b: LibraryEntry) => number> = {
  nameASC: (a, b) => a.name.localeCompare(b.name),
  nameDESC: (a, b) => b.name.localeCompare(a.name),
  missingCoverASC: (a, b) => {
    const aHasCover = a.__type === 'directory' ? !!findCover(a) : false;
    const bHasCover = b.__type === 'directory' ? !!findCover(b) : false;
    if (aHasCover && !bHasCover) {
      return 1;
    } else if (!aHasCover && bHasCover) {
      return -1;
    } else {
      return a.name.localeCompare(b.name);
    }
  },
  missingCoverDESC: (a, b) => {
    const aHasCover = a.__type === 'directory' ? !!findCover(a) : true;
    const bHasCover = b.__type === 'directory' ? !!findCover(b) : true;
    if (aHasCover && !bHasCover) {
      return -1;
    } else if (!aHasCover && bHasCover) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  },
  contentLengthASC: (a, b) => {
    if (a.__type === 'directory' && b.__type === 'directory') {
      return a.content.length - b.content.length;
    } else {
      return a.name.localeCompare(b.name);
    }
  },
  contentLengthDESC: (a, b) => {
    if (a.__type === 'directory' && b.__type === 'directory') {
      return b.content.length - a.content.length;
    } else {
      return a.name.localeCompare(b.name);
    }
  },
};
