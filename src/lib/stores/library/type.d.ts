import { IMAGE_TYPES } from './constants';

const CONST_IMAGE_TYPES = IMAGE_TYPES as const;
export type ImageType = (typeof CONST_IMAGE_TYPES)[number];

export type Image = {
  __type: 'image';
  name: string;
  type: ImageType;
  path: string;
  src: string;
};

export type UnknownFile = {
  __type: 'unknown';
  name: string;
  path: string;
};

export type InfoFile = {
  __type: 'info';
  name: string;
  path: string;
};

export type File = Image | InfoFile | UnknownFile;

export type Directory = {
  __type: 'directory';
  name: string;
  path: string;
  content: LibraryEntry[];
};

export type LibraryEntry = File | Directory;

export type LibraryStats = {
  fileCount: number;
  directoryCount: number;
};

export type Library = {
  path: string;
  content: LibraryEntry[];
  stats: LibraryStats;
};
