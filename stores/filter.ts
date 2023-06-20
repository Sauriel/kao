export const useFilterStore = defineStore('filter-store', () => {
  const searchTerm = ref<string>('');

  return {
    searchTerm
  }
})