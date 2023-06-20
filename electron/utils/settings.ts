import Store from 'electron-store';
import type UiSettings from '../../shared/models/settings';
import { DEFAULT_SETTINGS } from '../../shared/models/settings';
import DB, { LibraryDBEntry } from './database';

const store = new Store<Record<string, string | UiSettings>>();

const PATH = 'library.path';
const UI_SETTINGS = 'ui.settings';
const PATH_DB_ID = 'library-path';

function getLibraryPath(): string {
  return store.get(PATH) as string;
}

function setLibraryPath(path?: string) {
  if (path) {
    store.set(PATH, path);
    DB.update<LibraryDBEntry>(
      { _id: PATH_DB_ID },
      { _id: PATH_DB_ID, name: PATH_DB_ID, path },
      { upsert: true }
    )
    .catch(error => {
      console.error(error);
    });
  }
}

function getUiSettings(): UiSettings {
  const settings = store.get(UI_SETTINGS, DEFAULT_SETTINGS) as UiSettings
  return settings;
}

function setUiSettings(settings: Partial<UiSettings>) {
  const existingSettings = getUiSettings();
  const mergedSettings: UiSettings = {
    ...existingSettings,
    ...settings
  };
  store.set(UI_SETTINGS, mergedSettings);
}

export default {
  library: {
    path: {
      set: setLibraryPath,
      get: getLibraryPath
    }
  },
  ui: {
    set: setUiSettings,
    get: getUiSettings
  }
}