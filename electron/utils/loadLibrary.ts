import * as pathUtil from 'path';
import * as fs from 'fs/promises';
import * as fsSync from 'fs';
import type DirOrFile from '../../shared/models/files';
import type { Directory, File } from '../../shared/models/files';
import type { Dirent } from 'fs';
import { sortAlpha } from './sorting';
import { runInNewThread } from './threads';

const ALLOWED_IMAGE_EXTENSIONS: string[] = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];
const FILE_BLACKLIST: RegExp[] = [
  /.*\.lnk$/gi
];

function convertDirContent(value: Dirent, path: string): DirOrFile {
  if (value.isDirectory()) {
    return createDirectory(value.name, path);
  } else {
    return createFile(value.name, path);
  }
}

function createDirectory(name: string, path: string): Directory {
  const dir: Directory = {
    type: 'directory',
    name,
    path
  };

  const cover = fsSync.readdirSync(path, { withFileTypes: true })
    .filter(filterFiles)
    .find(isCoverImage);
  if (cover) {
    dir.cover = createFile(cover.name, pathUtil.join(path, cover.name));
  }

  return dir;
}

function createFile(name: string, path: string): File {
  if (isImage(name)) {
    return {
      type: 'image',
      name,
      path
    };
  }
  return {
    type: 'unknown',
    name,
    path
  };
}

function isImage(name: string): boolean {
  const fileType = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.includes(fileType);
}

function fileNameEquals(file: Dirent, expected: string): boolean {
  const name = file.name.substring(0, file.name.lastIndexOf('.'));
  return name.toLowerCase() === expected.toLowerCase();
}

function isCoverImage(file: Dirent): boolean {
  return !file.isDirectory() && isImage(file.name) && fileNameEquals(file, '0');
}

function filterFiles(file: Dirent): boolean {
  for (const regexp of FILE_BLACKLIST) {
    if (regexp.test(file.name)) {
      return false;
    }
  }
  return true;
}

function getSorting(type: string): (a: Dirent, b: Dirent) => number {
  return sortAlpha;
}

async function lookupDirectory(path: string, persist?: boolean): Promise<DirOrFile[]> {
  return fs.readdir(path, { withFileTypes: true })
    .then(result => result.filter(filterFiles)
      .sort(getSorting(''))
      .map(value => convertDirContent(value, pathUtil.join(path, value.name))))
    .then(dirsAndFiles => {
      if (persist) {
        console.time('loading library in db');
        runInNewThread('./dist-electron/libraryScanner.js', path)
          .then((result) => {
            console.timeEnd('loading library in db');
            console.log(result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
      return dirsAndFiles;
    })
    .catch(e => []);
}

export default lookupDirectory;