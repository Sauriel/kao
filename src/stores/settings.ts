import { map, onMount, action, MapStore } from 'nanostores';
import type { Get } from 'nanostores/map';
import type UiSettings from '@shared/models/settings';
import { DEFAULT_SETTINGS } from '@shared/models/settings';

export const settings = map<UiSettings>({
  ...DEFAULT_SETTINGS
});

onMount(settings, () => {
  window.electronAPI.getSettings()
    .then(result => settings.set(result));
});

export const setSettingsValue = action(settings, 'setValue', (store: MapStore<UiSettings>, field: keyof UiSettings, value: Get<UiSettings, keyof UiSettings>) => {
  store.setKey(field, value);
  window.ipcRenderer.send('setSettings', store.get());
});