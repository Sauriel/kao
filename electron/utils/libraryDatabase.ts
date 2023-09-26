import * as pathUtil from 'path';
import * as fs from 'fs/promises';
import DB, { LibraryDBEntry } from "./database";
import { Dirent } from 'fs';
import LineReaderPromise from './lineReaderPromise';

class ImportInfo {
  files: number = 0;
  folder: number = 0;

  countFile() {
    this.files++;
  }

  countFolder() {
    this.folder++;
  }

  result(): string {
    return `Imported ${this.files} files in ${this.folder} folders.`;
  }
}

async function handleFile(path: string, dir: Dirent, files: string[], info: Record<string, string>) {
  const filePath = pathUtil.join(path, dir.name);
  files.push(filePath);
  if (dir.name.endsWith('.txt')) {
    await LineReaderPromise(filePath, {}, (line: string) => {
      if (line !== '') {
        const splitted = line.split(':');
        if (splitted.length === 2) {
          const key = splitted[0].trim();
          const value = splitted[1].trim();
          info[key] = value;
        }
      }
    });
  }
}

async function handleDirectory(path: string, dir: Dirent, importInfo: ImportInfo): Promise<LibraryDBEntry> {
  const directoryPath = pathUtil.join(path, dir.name);
  const libraryFolder: LibraryDBEntry = {
    name: dir.name,
    type: 'directory',
    path: directoryPath
  };
  const files: string[] = [];
  const folders: LibraryDBEntry[] = [];
  const info: Record<string, string> = {};

  try {
    const contents = await fs.readdir(directoryPath, { withFileTypes: true });
    for (const content of contents) {
      if (content.isDirectory()) {
        folders.push(await handleDirectory(directoryPath, content, importInfo));
      } else {
        await handleFile(directoryPath, content, files, info);
        importInfo.countFile();
      }
    }

    if (folders.length > 0) {
      libraryFolder.folders = folders;
    }
    if (files.length > 0) {
      libraryFolder.files = files;
    }
    if (Object.keys(info).length > 0) {
      libraryFolder.info = info;
    }
  } catch (error) {
    console.error(error);
  }
  importInfo.countFolder();
  return libraryFolder;
}

async function persist(path: string, dirent: Dirent, importInfo: ImportInfo): Promise<LibraryDBEntry> {
  if (dirent.isDirectory()) {
    return handleDirectory(path, dirent, importInfo);
  } else {
    // const filePath = pathUtil.join(path, dirent.name);
    const libraryFile: LibraryDBEntry = {
      name: dirent.name,
      type: 'file',
      path: dirent.name
    };
    importInfo.countFile();
    return Promise.resolve(libraryFile);
  }
}

async function scanDirectoryAndPersist(rootPath: string): Promise<string> {
  return fs.readdir(rootPath, { withFileTypes: true })
    .then((result: Dirent[]) => {
      const importInfo = new ImportInfo();
      const persistedPromises: Promise<LibraryDBEntry>[] = [];

      for (const entry of result) {
        persistedPromises.push(persist(rootPath, entry, importInfo));
      }

      return Promise.allSettled(persistedPromises)
        .then(results => {
          for (const result of results) {
            if (result.status === 'fulfilled') {
              const fulfilledResult = result as PromiseFulfilledResult<LibraryDBEntry>;
              DB.update<LibraryDBEntry>(
                { path: fulfilledResult.value.path },
                fulfilledResult.value,
                { upsert: true })
                .catch(e => console.error(e));
            } else {
              const rejectedResult = result as PromiseRejectedResult;
              console.error(rejectedResult);
            }
          }
          return importInfo.result();
        })
    })
}

export default scanDirectoryAndPersist;