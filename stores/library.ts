import { Directory } from "~/shared/models/files";
import { useSettingsStore } from "./settings";

export const useLibraryStore = defineStore('library-store', () => {
  const { $bus } = useNuxtApp();

  const path = ref<string>('');
  const name = ref<string>('');
  const search = ref<string>('');

  const settingsStore = useSettingsStore();

  function openDirectory(directory: Directory) {
    if (settingsStore.openInDialog) {
      $bus.emit('directory:open', {
        open: true,
        name: directory.name,
        path: directory.path
      });
    } else {
      name.value = directory.name;
      path.value = directory.path;
      navigateTo('/directory');
    }
  }

  return {
    path,
    name,
    search,
    openDirectory
  }
})