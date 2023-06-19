import Store from 'electron-store';
import type UiSettings from '../../shared/models/settings';
import { DEFAULT_SETTINGS } from '../../shared/models/settings';
import DB, { DbDoc } from './database';

const store = new Store<Record<string, string | UiSettings>>();

const PATH = 'library.path';
const UI_SETTINGS = 'ui.settings';

declare type SettingsDBEntry = DbDoc & {
  _id: 'library-path'
  path: string;
}

function getLibraryPath(): string {
  return store.get(PATH) as string;
}

function setLibraryPath(path?: string) {
  if (path) {
    store.set(PATH, path);
    DB.insertOrUpdate<SettingsDBEntry>({ _id: 'library-path' }, { _id: 'library-path', path })
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