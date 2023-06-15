import { map, onMount, action } from 'nanostores';
import type UiSettings from '@shared/models/settings';
import { DEFAULT_SETTINGS } from '@shared/models/settings';

export const settings = map<UiSettings>({
  ...DEFAULT_SETTINGS
});

onMount(settings, () => {
  window.electronAPI.getSettings()
    .then(result => settings.set(result));
});

export const setValue = action(settings, 'setValue', (store, field: keyof UiSettings, value: any) => {
  //store
});