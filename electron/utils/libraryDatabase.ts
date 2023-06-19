import * as pathUtil from 'path';
import * as fs from 'fs/promises';
import DB, { LibraryDBEntry } from "./database";
import { Dirent } from 'fs';
import LineReaderPromise from './lineReaderPromise';

async function scanDirectoryAndPersist(rootPath: string) {
  fs.readdir(rootPath, { withFileTypes: true })
    .then((result: Dirent[]) => {
      for (const entry of result) {
        if (entry.isDirectory()) {
          const directoryPath = pathUtil.join(rootPath, entry.name);
          const libraryFolder: LibraryDBEntry = {
            name: entry.name,
            path: directoryPath
          };

          fs.readdir(directoryPath, { withFileTypes: true })
            .then(async (result: Dirent[]) => {
              const files: string[] = [];
              for (const content of result) {
                if (content.isDirectory()) {
                  //
                } else {
                  const filePath = pathUtil.join(directoryPath, content.name);
                  files.push(filePath);
                  if (content.name.endsWith('.txt')) {
                    const info: Record<string, string> = {};
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

                    if (Object.keys(info).length > 0) {
                      libraryFolder.info = info;
                    }
                  }
                }
              }
              if (files.length > 0) {
                libraryFolder.files = files;
              }
              DB.update<LibraryDBEntry>(
              { path: directoryPath },
              libraryFolder,
              { upsert: true });
            });
        }
      }
    });
}

export default scanDirectoryAndPersist;