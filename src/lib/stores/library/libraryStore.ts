import { writable } from 'svelte/store';
import { readDir, readTextFile, readBinaryFile } from '@tauri-apps/api/fs';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import type { FileEntry, FsDirOptions } from '@tauri-apps/api/fs';
import type {
  File,
  UnknownFile,
  Image,
  Directory,
  LibraryEntry,
  ImageType,
  LibraryStats,
  Library,
  InfoFile,
} from './type';
import { IMAGE_TYPES, INFO_TYPE } from './constants';
import logStore from '$lib/stores/log/logStore';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Duration from 'dayjs/plugin/duration';
import filterStore from '../filter/filterStore';

dayjs.locale('de');
dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);
dayjs.extend(Duration);

const READ_DIR_OPTIONS: FsDirOptions = {
  recursive: true,
};

const infoFiles = new Map<string, string>();

const library = writable<Library | null>(null);

function handleUnknownSuffix(entry: FileEntry): UnknownFile {
  logStore.warn(`Unbekannter Dateityp: "${entry.path}"`);
  return {
    __type: 'unknown',
    name: entry.name!,
    path: entry.path,
  };
}

function handleInfoFile(entry: FileEntry, parentPath: string): InfoFile {
  const infoFile: InfoFile = {
    __type: 'info',
    name: entry.name!,
    path: entry.path,
  };
  infoFiles.set(parentPath, entry.path);
  return infoFile;
}

function asFile(entry: FileEntry, stats: LibraryStats, parentPath: string): File {
  stats.fileCount += 1;
  const suffix = entry.name!.split('.').pop()!;
  if (IMAGE_TYPES.includes(suffix)) {
    return asImage(entry, suffix);
  } else if (suffix === INFO_TYPE) {
    return handleInfoFile(entry, parentPath);
  } else {
    return handleUnknownSuffix(entry);
  }
}

function asImage(entry: FileEntry, type: ImageType): Image {
  return {
    __type: 'image',
    type: type,
    name: entry.name!,
    path: entry.path,
    src: convertFileSrc(entry.path),
  };
}

function asDirectory(entry: FileEntry, stats: LibraryStats): Directory {
  stats.directoryCount += 1;
  return {
    __type: 'directory',
    name: entry.name!,
    path: entry.path,
    content: entry.children!.map((child) => toLibraryEntries(child, stats, entry.path)),
  };
}

function toLibraryEntries(entry: FileEntry, stats: LibraryStats, parentPath: string): LibraryEntry {
  if (entry.children) {
    return asDirectory(entry, stats);
  } else {
    return asFile(entry, stats, parentPath);
  }
}

async function load(path: string): Promise<void> {
  logStore.clear();
  logStore.info(`Lade Dateien aus Order: "${path}"`);
  infoFiles.clear();
  const start = performance.now();
  return readDir(path, READ_DIR_OPTIONS).then((entries) => {
    const stats: LibraryStats = {
      fileCount: 0,
      directoryCount: 0,
    };
    const content = entries.map((entry) => toLibraryEntries(entry, stats, path));
    library.set({ path, content, stats });
    path;
    const duration = dayjs.duration(performance.now() - start);
    let durationString = '';
    if (duration.asSeconds() < 60) {
      durationString = `${Math.ceil(duration.asSeconds())}s`;
    } else {
      durationString = duration.format('m[m] s[s]');
    }
    logStore.info(
      `Bibliothek in ${durationString} geladen. ${stats.fileCount} Dateien in ${stats.directoryCount} Ordnern.`
    );
    loadInfo();
  });
}

function loadInfo() {
  filterStore.reset();
  logStore.info('Lade Info-Dateien');
  const promises: Promise<{ path: string; info: Map<string, string> }>[] = [];
  infoFiles.forEach((infoFile, directory) => {
    promises.push(
      readTextFile(infoFile)
        .catch(() =>
          readBinaryFile(infoFile).then((content) => new TextDecoder('latin1').decode(content))
        )
        .then((content) => {
          const contentMap = new Map<string, string>();
          const name = directory.split('/').pop()!;
          contentMap.set('Name', name);
          content
            .split(/\r?\n/)
            .filter((part) => part.trim().length > 0)
            .forEach((line) => {
              const indexOfFirstColon = line.indexOf(':');
              if (indexOfFirstColon === -1) {
                logStore.warn(`Ungültige Zeile in Info-Datei: "${infoFile}", Zeile: "${line}"`);
                return;
              }
              const key = line.substring(0, indexOfFirstColon).trim();
              const value = line.substring(indexOfFirstColon + 1).trim();
              contentMap.set(key, value);
            });
          return { path: directory, info: contentMap };
        })
    );
  });
  Promise.allSettled(promises).then((results) => {
    infoFiles.clear();
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        filterStore.addInfo(result.value.path, result.value.info);
      } else {
        logStore.error(`Fehler beim Laden der Info-Datei: "${result.reason}"`);
      }
    });
    logStore.info('Info-Dateien geladen');
  });
}

const libraryStore = {
  subscribe: library.subscribe,
  load,
};

export default libraryStore;
