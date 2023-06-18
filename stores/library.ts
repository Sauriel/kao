import { Directory } from "~/shared/models/files";

export const useLibraryStore = defineStore('library-store', () => {
  const path = ref<string>('');
  const name = ref<string>('');

  function openDirectory(directory: Directory) {
    path.value = directory.path;
    name.value = directory.name;
    navigateTo('/directory');
  }

  return {
    path,
    name,
    openDirectory
  }
})