import { ipcRenderer } from 'electron';
import UiSettings, { DEFAULT_SETTINGS } from '~/shared/models/settings';

export const useSettingsStore = defineStore('settings-store', () => {
  const settings = ref<UiSettings>({
      ...DEFAULT_SETTINGS
  });

  ipcRenderer.invoke('getSettings')
    .then((result: UiSettings) => settings.value = result)
    .catch(e => {
      console.error(e);
    });

  function saveSettings() {
    ipcRenderer.send('setSettings', { ... settings.value });
  }

  const gridView = computed<boolean>({
    get: () => settings.value.gridView,
    set: (newValue: boolean) => {
      settings.value.gridView = newValue;
      saveSettings();
    }
  });

  const previewAspectRatio = computed<number>({
    get: () => settings.value.previewAspectRatio,
    set: (newValue: number) => {
      settings.value.previewAspectRatio = newValue;
      saveSettings();
    }
  });

  return {
    gridView,
    previewAspectRatio
  }
})