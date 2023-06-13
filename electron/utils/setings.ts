import Store from 'electron-store';

const store = new Store<Record<string, string>>();

const PATH = 'library.path';

function getLibraryPath(): string {
  return store.get(PATH);
}

function setLibraryPath(path?: string) {
  if (path) {
    store.set(PATH, path);
  }
}

export default {
  library: {
    path: {
      set: setLibraryPath,
      get: getLibraryPath
    }
  }
}