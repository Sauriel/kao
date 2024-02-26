import { writable } from 'svelte/store';
import type { Settings, SortBy } from './type';

const LOCAL_STORAGE_KEY = 'settings';

const settings = writable<Settings>({
  basePath: null,
  aspectRatio: 3 / 4,
  gridView: false,
  sortBy: 'nameASC',
  showLog: false,
  showOnlyImages: true,
});

const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedSettings) {
  settings.set(JSON.parse(savedSettings));
}

function saveSettings(settings: Settings): Settings {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  return settings;
}

function setSettings(newSettings: Partial<Settings>) {
  settings.update((s) => saveSettings({ ...s, ...newSettings }));
}

const settingsStore = {
  subscribe: settings.subscribe,
  setAspectRatio: (aspectRatio: number) => setSettings({ aspectRatio }),
  setSortBy: (sortBy: SortBy) => setSettings({ sortBy }),
  setGridView: (gridView: boolean) => setSettings({ gridView }),
  setBasePath: (basePath: string) => setSettings({ basePath }),
  setShowOnlyImages: (showOnlyImages: boolean) => setSettings({ showOnlyImages }),
  toggleShowLog: () => settings.update((s) => saveSettings({ ...s, showLog: !s.showLog })),
  toggleGridView: () => settings.update((s) => saveSettings({ ...s, gridView: !s.gridView })),
  toggleShowOnlyImages: () =>
    settings.update((s) => saveSettings({ ...s, showOnlyImages: !s.showOnlyImages })),
};

export default settingsStore;
